import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuDataContext } from "./DataContext";

export default function ToogleMealCategory({
  filteredMenuData,
  diningHallParam,
  mealTimeParam,
}) {
  const { saveFavoritesToLocalStorage, favorites, setFavorites } =
    useContext(MenuDataContext);
  const uniqueMenusSet = new Set();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedDish, setSelectedDish] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //get all dish categories
  filteredMenuData.menu.forEach((menuItem) => {
    uniqueMenusSet.add(menuItem.type);
  });

  const foodCategories = ["ALL", ...uniqueMenusSet];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  //save dish on hover
  const handleSaveClick = (menuItem) => {
    const newFavoritesMap = { ...favorites };
    if (newFavoritesMap[menuItem._id]) {
      delete newFavoritesMap[menuItem._id];
    } else {
      newFavoritesMap[menuItem._id] = [
        mealTimeParam.toUpperCase(),
        menuItem.dish,
        menuItem.type,
      ];
    }
    setFavorites(newFavoritesMap);
    saveFavoritesToLocalStorage(newFavoritesMap);
  };

  //show additional info when user clicks on dish
  const handleDishClick = async (option) => {
    setSelectedDish(option);
    if (option !== "") {
      const filterDish = () => {
        if (option.toLowerCase() === "all") {
          return filteredMenuData.menu;
        }
        return filteredMenuData.menu.filter((menuItem) => {
          return menuItem.dish.toLowerCase() === option.toLowerCase();
        });
      };

      const dish = await filterDish();

      navigate(
        `/menu/${diningHallParam.toLowerCase()}/${mealTimeParam.toLowerCase()}/${option.toLowerCase()}`,
        { state: { dishClicked: dish } }
      );
    }
  };

  //set default category to "ALL"
  useEffect(() => {
    setSelectedCategory("ALL");
  }, [location]);

  //get all dish from specific category
  const filterItems = useMemo(() => {
    if (selectedCategory.toLowerCase() === "all") {
      return filteredMenuData.menu;
    } else {
      return filteredMenuData.menu.filter((menuItem) => {
        return menuItem.type === selectedCategory;
      });
    }
  }, [selectedCategory, filteredMenuData]);

  return (
    <div>
      <div className="relative isolate px-6 pt-20 lg:pt-10 lg:px-8">
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>

          <select
            id="Tab"
            className="w-full rounded-md border-gray-200"
            onChange={(event) => setSelectedCategory(event.target.value)}
            value={selectedCategory}
          >
            {foodCategories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block">
          <div className=" mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none ">
            <nav className="-mb-px flex justify-center">
              <div className="-mb-px flex justify-between">
                {foodCategories.map((category) => (
                  <div
                    role="button"
                    key={category}
                    className={`shrink-0 border-b-2 mx-3 pb-4 text-sm font-medium hover:border-gray-300 hover:cursor-pointer hover:text-gray-700 ${
                      selectedCategory === category
                        ? " border-sky-500 text-sky-600"
                        : "border-transparent text-gray-500"
                    } `}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-gray-100 min-h-[500px]">
        {
          <h2 className="text-2xl lg:text-4xl text-center font-bold py-2 text-gray-900">
            {mealTimeParam.toUpperCase()}
          </h2>
        }

        {filterItems &&
          filterItems.map((menuItem) => (
            <li
              key={menuItem._id}
              className="flex justify-between gap-x-6 py-5 px-6 lg:px-24 group"
            >
              <div className="flex gap-x-4 items-center lg:justify-center">
                <img
                  className="h-10 w-10 flex-none rounded-full bg-gray-50 object-cover"
                  src={menuItem.imageUrl}
                  alt=""
                />
                <div className="min-w-0 flex-auto whitespace-normal">
                  <div className="flex flex-row">
                    <div className="self-start max-w-4xl max-sm:max-w-xs max-lg:max-w-lg ">
                      <p
                        onClick={() => {
                          handleDishClick(menuItem.dish.trim());
                        }}
                        className="text-sm max-sm:text-xs uppercase font-semibold text-gray-900 hover:cursor-pointer hover:text-gray-500  "
                      >
                        {menuItem.dish}
                      </p>

                      <p className="mt-1 text-sm capitalize max-sm:text-xs leading-5 text-gray-500">
                        {menuItem.ingredients}
                      </p>
                    </div>
                    <div className="self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={favorites[menuItem._id] ? "grey" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={favorites[menuItem._id] ? 0 : 0.5}
                        stroke="currentColor"
                        className="w-5 h-5  ml-3 hidden group-hover:block hover:opacity-100 cursor-pointer transition-opacity ease-in duration-300"
                        onClick={() => {
                          handleSaveClick(menuItem);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
