import React, { useContext } from "react";
import { MenuDataContext } from "./DataContext";

export default function FoodEvents() {
  const { eventData } = useContext(MenuDataContext);

  if (eventData.length < 1) {
    return (
      <div className="relative ">
        <img
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Food"
          className="w-full h-[1400px]  object-cover inset-0 scale-x-[-1]"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 px-6 py-32 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-gray-900 sm:text-4xl">
              No Events Found :(
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section>
        <div className="mx-auto min-h-screen max-w-screen px-4 pt-36 pb-8 max-sm:px-1 lg:px-8">
          <h2 className="text-center font-serif text-4xl max-md:text-base text-gray-700 font-semibold tracking-tight "></h2>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {eventData.map((event) => (
              <blockquote
                key={event._id}
                className="rounded-lg bg-gray-100 p-8"
              >
                <div>
                  <div>
                    <p className="mt-1 text-xl capitalize max-md:text-sm font-medium text-gray-700 ">
                      {event.eventType}
                      <div className="px-4 py-0.5 capitalize max-md:text-xs text-sm text-gray-500">
                        {`${event.date} @${event.venue}`}
                      </div>
                      <div className="px-4 uppercase py-0.5 max-md:text-xs text-sm text-gray-500">
                        {event.time}
                      </div>
                      <div className="px-4 py-0.5 max-md:text-xs text-sm text-gray-500">
                        {`${event.note ? event.note : ""}`}
                      </div>
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-end justify-end">
                  {event.link ? (
                    <a
                      className="inline-block rounded-full border  border-gray-600 px-4 py-2 max-lg:text-xs   text-xs font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none  active:bg-indigo-500"
                      href={event.link}
                    >
                      Details
                    </a>
                  ) : null}
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
