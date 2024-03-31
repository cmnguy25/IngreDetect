import React from "react";
import { Link } from "react-router-dom";

function LandingPageBody() {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&w=1200&q=60"
        alt="Pasta"
        className="w-full h-auto max-sm:h-[500px] object-cover inset-0"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-start">
        <div className=" isolate px-6 max-xs:px-2 max-sm:px-3 pt-14 ">
          <div className="mx-auto max-w-2xl py-32 ">
            <div className="text-center px-16 max-sm:px-0 max-lg:px-6">
              <h1 className=" text-gray-900 ">
                <div className="flex justify-start text-6xl  max-sm:text-lg max-lg:text-4xl first-line:">
                  <pre className="font-serif">
                    <span className="text-blue-300 font-bold  ">Ingre</span>
                    <span className="text-orange-500 font-bold">Detect</span>
                  </pre>
                </div>
                <div className="flex items-center justify-start  ">
                  <p className="text-gray-400 font-serif font-semibold text-4xl tracking-tight max-sm:text-xs max-lg:text-xl ">
                    Know Your Plate
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-utensils-crossed  max-lg:h-5 max-lg:w-5 max-2xl:h-10 max-2xl:w-10 "
                  >
                    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                    <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                    <path d="m2.1 21.8 6.4-6.3" />
                    <path d="m19 5-7 7" />
                  </svg>
                </div>
              </h1>

              <div className="mt-8 px-0 max-sm:mt-4 flex items-center justify-center max-sm:justify-start">
                <Link
                  to="/mealtime"
                  className="inline-block rounded-full border  border-gray-600 px-12 py-3 max-lg:text-xs max-sm:px-4 max-lg:px-6 max-lg:py-2  text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none  active:bg-indigo-500"
                >
                  Get Menu
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default LandingPageBody;
