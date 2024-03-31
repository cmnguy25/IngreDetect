import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderMeal({ menuData }) {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  
  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    if (option !== "") {
      navigate(
        `/menu/${menuData[0].diningHall.toLowerCase()}/${option.toLowerCase()}`
      );
    }
  };

  return (
    <div className="px-4 max-sm:px-1">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-80"}
                group inline-flex  items-center rounded-lg bg-green-50 border-gray-600 text-gray-600  px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 text-sm font-medium  hover:bg-indigo-600 hover:text-white focus:outline-none  active:bg-indigo-500`}
            >
              <span>Meal</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-100"}
                   h-4 w-4 text-orange-900 transition duration-150 ease-in-out group-hover:text-opacity-100`}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3  w-48 -translate-x-3/4 transform max-w-sm  max-sm::max-w-xs ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-1 bg-white py-3 px-1 lg:grid-cols-1">
                    {menuData.map((item) => (
                      <>
                        <Popover.Button
                          key={item._id}
                          onClick={() => handleOptionSelection(item.meal)}
                          className=" border-none relative flex flex-col justify-between align-middle text-left rounded-md transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 group"
                        >
                          <div className=" text-sm font-normal  ">
                            <div className=" w-36">{item.meal}</div>

                            <ul className="mb-1 mt-0 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                              <li>{item.time}</li>
                            </ul>
                          </div>
                        </Popover.Button>
                      </>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
