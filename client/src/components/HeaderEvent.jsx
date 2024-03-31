import React from "react";
import { Link } from "react-router-dom";

export default function HeaderEvent() {
  return (
    <Link
      to="/events"
      className="border text-opacity-80 inline-flex items-center rounded-lg bg-green-50 border-gray-600 text-gray-600 px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 text-sm font-medium hover:bg-indigo-600 hover:text-white focus:outline-none active:bg-indigo-500"
    >
      Events
    </Link>
  );
}
