import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Favorite({
  handleDeleteClick,
  favorites,
  handleDeleteAllClick,
}) {
  const [mealTimeSelected, setMealTimeSelected] = useState("BREAKFAST");
  const mealTypeByTime = ["BREAKFAST", "LUNCH", "DINNER"];
  const eachMealTimeItem = (obj, value) => {
    const result = [];
    for (const key in obj) {
      if (obj[key][0] === value) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  return (
    <>
      <div>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-80"}
                group inline-flex  items-center rounded-lg bg-green-50 border-gray-600 text-gray-600  px-3 py-2 max-sm:px-2 max-sm:py-1.5 text-base font-medium  hover:bg-indigo-600 hover:text-white focus:outline-none  active:bg-indigo-500`}
              >
                <div className="flex flex-row">
                  <p className="text-sm font-semibold">Saved </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 align-middle"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
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
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen -translate-x-3/4 transform max-w-sm  max-sm::max-w-xs ">
                  <div className=" overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-1 bg-white p-7 lg:grid-cols-2">
                      <div className=" px-1 py-2 sm:px-0">
                        <Tab.Group>
                          <Tab.List className="flex space-x-1 justify-between rounded-xl">
                            {mealTypeByTime.map((mealType, idx) => (
                              <Tab
                                key={idx}
                                className={({ selected }) =>
                                  classNames(
                                    "w-full rounded-lg py-2.5 text-xs font-sm leading-5 focus:outline-none  text-blue-700 hover:bg-blue-700 hover:text-white",
                                    selected
                                      ? "bg-gray-300  text-black "
                                      : "text-blue-100  "
                                  )
                                }
                                onClick={() => {
                                  setMealTimeSelected(mealType);
                                }}
                              >
                                {mealType}
                              </Tab>
                            ))}
                          </Tab.List>
                          <Tab.Panels className="mt-2">
                            {mealTypeByTime.map((mealType, idx) => (
                              <Tab.Panel key={idx} className="pl-1">
                                <ul className="w-64">
                                  {Object.entries(
                                    eachMealTimeItem(favorites, mealType)
                                  ).map(([k, val]) => (
                                    <li
                                      key={k}
                                      className="relative flex justify-between rounded-md transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 group"
                                    >
                                      <div className="pt-2">
                                        <div className=" text-sm font-medium leading-5 ">
                                          <div className="w-60">{val[1]}</div>
                                        </div>

                                        <ul className="mb-1 mt-0 flex space-x-1 text-xs capitalize font-normal leading-4 text-gray-500">
                                          <li>{val[2].toLowerCase()}</li>
                                        </ul>
                                      </div>
                                      <div className="self-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          className="w-5 h-5 hover:opacity-100 cursor-pointer transition-opacity ease-in duration-300 hidden group-hover:block"
                                          onClick={() => {
                                            handleDeleteClick(k);
                                          }}
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                        </svg>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </Tab.Panel>
                            ))}
                          </Tab.Panels>
                        </Tab.Group>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4">
                      <a
                        href="##"
                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <span className="flex items-center justify-center">
                          <span
                            className="text-sm font-medium text-gray-900"
                            onClick={() => {
                              handleDeleteAllClick(mealTimeSelected);
                            }}
                          >
                            Delete All
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
}
