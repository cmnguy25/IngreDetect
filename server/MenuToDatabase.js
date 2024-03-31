const { askChatGPT } = require("./GetChatResponse");
const googlethis = require("googlethis");
const mongoose = require("mongoose");
const Menu = require("./model/MenuSchema");
const { getCleanMenu } = require("./GetMenu");
const cron = require("node-cron");
const mongoDBURI = process.env.ATLAS_URI;
require("dotenv").config();

//return image based on search query
async function searchImageLink(query) {
  try {
    const images = await googlethis.image(query, { safe: true });

    if (images.length > 0) {
      const firstImageResult = images[0];
      return firstImageResult.url;
    }
  } catch (error) {
    console.log("No Image found. Default image link used");
    return "https://as2.ftcdn.net/v2/jpg/04/00/24/31/1000_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
  }
}

//extract the ingredients from chatGPT response
async function extractIngredients(chatResponse) {
  const index = chatResponse.toLowerCase().indexOf("ingredients:");
  if (index !== -1) {
    return chatResponse.slice(index + "ingredients:".length).trim();
  } else {
    return chatResponse.slice(2).trim();
  }
}

//read menu and add to database
async function readMenu(email) {
  const lines = email.split("\n");
  const menuItems = [];
  let readingMenu = false;
  const ignoreFoods = new Set(["SCRAMBLER BAR"]);

  //all the items for which we dont want the ingredients and additional info
  const ignoreAdditionalInfo = new Set([
    "CAGE FREE HARD BOILED EGGS",
    "CAGE FREE SCRAMBLED EGGS",
    "HARD BOILED EGGS",
    "HARD BOILED EGGS",
    "FRUIT SALAD",
    "SOUP",
    "SALAD BAR",
    "FROZEN NOVELTIES",
    "BUILD YOUR OWN BURGER BAR",
    "GRILLED CHEESE UPON REQUEST",
  ]);

  const replaceWords =
    /AVAILABLE UPON REQUEST|OF THE DAY|HOUSE MADE|HOME|BUILD YOUR OWN|UPON REQUEST|MAINE GRAINS/gi;

  //to remove the invisible characters not caught by trim
  const invisibleChar =
    /^[\s\u200B-\u200D\uFEFF\xA0]+|[\s\u200B-\u200D\uFEFF\xA0]+$/g;

  for (let line of lines) {
    if (line === "View Full Menu") {
      break;
    } else if (line === "TODAY'S MENU") {
      readingMenu = true;
      continue;
    } else if (readingMenu) {
      const first10Chars = line.substring(0, 10);
      const pattern = /(BREAKFAST|LUNCH|DINNER)/i;
      if (pattern.test(first10Chars)) {
        let templateForThisMeal = {};

        //split the lines
        splitted = line.split(/\s{2,}/);

        //get firsst two elements
        const [meal, diningHall, time] = splitted;
        templateForThisMeal.meal = meal;
        templateForThisMeal.diningHall = diningHall;
        templateForThisMeal.time = time;
        templateForThisMeal.menu = [];

        const arrCopy = splitted.slice();
        arrCopy.splice(0, 3);

        let isDishName = true;

        let newItem = null;
        for (let i = 0; i < arrCopy.length; i++) {
          let item = arrCopy[i].trim();
          let firstLetter = item[0];

          if (ignoreFoods.has(item.toUpperCase())) {
            newItem = {};
            continue;
          }
          if (firstLetter != "@") {
            newItem = {};
            newItem.dish = item;
          } else {
            if (newItem.dish) {
              newItem.type = item
                .replace("@", "")
                .replace(invisibleChar, "")
                .toUpperCase();

              let queryImageText =
                newItem.type.trim() === "ICE CREAM"
                  ? newItem.dish + " ICE CREAM"
                  : newItem.dish + " homemade";

              queryImageText = queryImageText.replace(replaceWords, "").trim();

              //get image
              let imageLink = await searchImageLink(queryImageText);
              newItem.imageUrl = imageLink;

              //get chatGPT response
              if (!ignoreAdditionalInfo.has(newItem.dish.trim())) {
                console.log("Dish Name: ", newItem.dish);
                let queryChatText =
                  newItem.type.trim() === "ICE CREAM"
                    ? newItem.dish + " ICE CREAM"
                    : newItem.dish;
                queryChatText = queryChatText.replace(replaceWords, "").trim();
                const chatResponse = await askChatGPT(queryChatText);
                try {
                  let splittedChatResponse = chatResponse
                    .split(/\n/)
                    .filter((item) => item.trim() !== "");

                  newItem.ingredients = await extractIngredients(
                    splittedChatResponse[0]
                  );
                  newItem.information = splittedChatResponse
                    .slice(1)
                    .join("\n")
                    .trim()
                    .slice(2)
                    .trim();
                } catch (error) {
                  console.log("Error in Chat Response");
                }
              }
              isDishName = false;
              templateForThisMeal.menu.push(newItem);
            }
          }
        }

        //save each meal type to database
        const newMeal = new Menu(templateForThisMeal);
        await newMeal.save();
        console.log("New meal by category saved");
      }
    } else {
      continue;
    }
  }
  return menuItems;
}

async function saveMealsToDatabase() {
  email = await getCleanMenu();

  // delete the existing database schema
  const deleteResult = await Menu.deleteMany({});
  console.log(`Deleted ${deleteResult.deletedCount} existing meals.`);

  // add the new schema
  const menuItems = await readMenu(email);

  console.log("Added to database");
  return;
}

//connect to the MongoDB database
const scheduleMenuSave = () => {
  mongoose
    .connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the MongoDB database.");

      // schedule the task to run every day at 8:15 AM EST
      cron.schedule(
        "15 8 * * *",
        () => {
          console.log("Running cron job");
          saveMealsToDatabase();
        },
        {
          timezone: "America/New_York",
        }
      );
    })
    .then(() => {
      console.log("Database connection closed.");
    })
    .catch((error) => {
      console.error("Error connecting to the MongoDB database:", error);
    });
};

module.exports = { scheduleMenuSave };
