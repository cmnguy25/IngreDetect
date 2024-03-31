import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="">
      <div className="isolate mx-auto max-w-screen-xl px-4 pb-8 pt-0 sm:px-6 lg:px-8    ">
        <div className="mt-16 border-t border-gray-200 pt-8 sm:flex  sm:items-center sm:justify-between lg:mt-24">
          <ul className=" mx-auto mt-8 flex justify-center gap-6 sm:mt-0">
            <li>
              <Link
                to="/contact"
                rel="noreferrer"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Contact</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                rel="noreferrer"
                className="text-gray-700 transition hover:opacity-75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </Link>
            </li>
            {/* <li>
              <a
                href="https://www.linkedin.com/in/khadka-bishal/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="h-6 w-6"
                >
                  <path
                    fill="#0077b7"
                    d="M1.15 21.7h13V61h-13zm46.55-1.3c-5.7 0-9.1 2.1-12.7 6.7v-5.4H22V61h13.1V39.7c0-4.5 2.3-8.9 7.5-8.9s8.3 4.4 8.3 8.8V61H64V38.7c0-15.5-10.5-18.3-16.3-18.3zM7.7 2.6C3.4 2.6 0 5.7 0 9.5s3.4 6.9 7.7 6.9 7.7-3.1 7.7-6.9S12 2.6 7.7 2.6z"
                  ></path>
                </svg>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
