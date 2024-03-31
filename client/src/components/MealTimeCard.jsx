import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MenuDataContext } from "./DataContext";

const imageLinks = [
  {
    image1:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",

    image2:
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",

    image2:
      "https://plus.unsplash.com/premium_photo-1672242676674-f4349cc6470e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2132&q=80",

    image2:
      "https://images.unsplash.com/photo-1627042633145-b780d842ba45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
];

export default function MealTimeCard() {
  const { menuData } = useContext(MenuDataContext);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (selectedOption !== "") {
      navigate(
        `/menu/${menuData[0].diningHall.toLowerCase()}/${selectedOption.toLowerCase()}`
      );
    }
  }, [selectedOption]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32  ">
          {menuData.length > 0 && (
            <h2 className="text-2xl lg:text-4xl text-center font-bold py-2 text-gray-900  ">
              {menuData[0].diningHall}
            </h2>
          )}

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0   ">
            {menuData.length > 0 &&
              menuData.map((item, idx) => {
                return (
                  <div key={item.time} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg  sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        src={imageLinks[idx].image1}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                      />
                      <img
                        src={imageLinks[idx].image2}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-gray-900 ">
                      <Link onClick={() => handleOptionSelection(item.meal)}>
                        <span className="absolute inset-0 " />
                        {item.meal}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
