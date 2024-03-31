import React, { useContext } from "react";
import { Soup } from "lucide-react";
import { Link } from "react-router-dom";
import Favorite from "./Favorites";
import HeaderMeal from "./HeaderMeal";
import { MenuDataContext } from "./DataContext";
import HeaderEvent from "./HeaderEvent";

export default function Header() {
  const { menuData, handleDeleteClick, favorites, handleDeleteAllClick } =
    useContext(MenuDataContext);
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">IngreDetect</span>
              <Soup color="grey" size={34} />
            </Link>
          </div>
          <div className="flex flex-row">
            <HeaderEvent />
            <HeaderMeal menuData={menuData} />
            <Favorite
              handleDeleteClick={handleDeleteClick}
              favorites={favorites}
              handleDeleteAllClick={handleDeleteAllClick}
            />
          </div>
        </nav>
      </header>
    </div>
  );
}
