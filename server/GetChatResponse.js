const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// gets response from chatGPT
async function askChatGPT(foodName) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `1. What are the common ingredients of ${foodName}. Start the answer with 'Common ingredients: ' and directly list down the ingredients and meat items, if present, and make it clear which animal the meat comes from. All items should be separated by commas do not give any other information and do not add anything in parentheses. Do not include optional ingredients and if you do, say that is is optional.
          2. Also, on a new line, tell me some background and information about ${foodName}. Do not write in bullet points but in paragraphs, at most 170 words.
          You must follow the structure of the given sample response (it is a response for Pepperoni Stromboli, your response should be about ${foodName}) and start the answer directly at 1. without anything before. Each answer should be numbered.
          1. Common Ingredients: Pepperoni (pork), shredded mozzarella cheese, pesto (optional) ...
          2. Pepperoni Stromboli pizza is a ...`,
        },
      ],
    });

    const completion = response.data.choices[0].message.content;
    return completion;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { askChatGPT };
