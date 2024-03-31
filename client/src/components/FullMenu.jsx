import React, { useContext, useEffect, useState } from "react";
import ToogleMealCategory from "./MenuToogle";
import { useParams } from "react-router-dom";
import { MenuDataContext } from "./DataContext";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

export default function Menu() {
  const { dininghall: diningHallParam, mealtime: mealTimeParam } = useParams();
  const [loading, setLoading] = useState(true);
  const { menuData } = useContext(MenuDataContext);
  const [filteredMenuData, setFilteredMenuData] = useState([]);
  const diningHalls = new Set(["dana", "foss", "bobs"]);
  const mealTimes = new Set(["breakfast", "lunch", "dinner"]);

  useEffect(() => {
    if (menuData) {
      const filtered = menuData.find(
        (item) =>
          item.meal.toLowerCase() === mealTimeParam &&
          item.diningHall.toLowerCase() === diningHallParam
      );

      setFilteredMenuData(filtered);
      setLoading(false);
    }
  }, [menuData, mealTimeParam]);

  // Handle 404 error later with a new page
  if (!diningHalls.has(diningHallParam) || !mealTimes.has(mealTimeParam)) {
    return <ErrorPage />;
  }

  //use leading icon
  if (loading) {
    return <Loading />;
  }

  //handle differently later
  if (!filteredMenuData) {
    return (
      <div className="relative ">
        <img
          src="https://images.unsplash.com/photo-1463740839922-2d3b7e426a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2750&q=80"
          alt="Food"
          className="w-full h-[1400px]  object-cover inset-0"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 px-6 py-32 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-gray-900 sm:text-4xl">
              Menu Not Found :(
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ToogleMealCategory
        filteredMenuData={filteredMenuData}
        diningHallParam={diningHallParam}
        mealTimeParam={mealTimeParam}
      />
    </div>
  );
}
