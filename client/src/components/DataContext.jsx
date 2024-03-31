import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const MenuDataContext = createContext();

const MenuDataProvider = ({ children }) => {
  const [menuData, setMenuData] = useState({});
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const apiBaseUrl = "https://ingredetect-server.onrender.com/api";

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  };

  const saveFavoritesToLocalStorage = (newFavoritesMap) => {
    const favoriteDishCache = {
      favorites: newFavoritesMap,
      createdDate: getCurrentDate(),
    };
    localStorage.setItem(
      "favoriteDishCache",
      JSON.stringify(favoriteDishCache)
    );
  };

  const loadFavoritesFromLocalStorage = () => {
    const favoriteDishCache = JSON.parse(
      localStorage.getItem("favoriteDishCache")
    );

    if (
      favoriteDishCache &&
      favoriteDishCache.createdDate === getCurrentDate()
    ) {
      setFavorites(favoriteDishCache.favorites);
    } else {
      setFavorites({});
      localStorage.removeItem("favoriteDishCache");
    }
  };

  const handleDeleteAllClick = (category) => {
    const newFavoritesMap = { ...favorites };

    Object.keys(newFavoritesMap).forEach((key) => {
      if (newFavoritesMap[key][0] === category) {
        delete newFavoritesMap[key];
      }
    });
    setFavorites(newFavoritesMap);
    saveFavoritesToLocalStorage(newFavoritesMap);
  };

  useEffect(() => {
    loadFavoritesFromLocalStorage();
  }, []);

  const handleDeleteClick = (key) => {
    const newFavoritesMap = { ...favorites };
    if (newFavoritesMap[key]) {
      delete newFavoritesMap[key];
      setFavorites(newFavoritesMap);
      saveFavoritesToLocalStorage(newFavoritesMap);
    }
  };

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const menu = await axios.get(`${apiBaseUrl}/full-menu`);
        setMenuData(menu.data);

        const event = await axios.get(`${apiBaseUrl}/events`);

        //ignore past data
        const filteredData = event.data.filter((item) => {
          const eventDate = new Date(item.date);
          const estOffset = 5 * 60;
          const estDate = new Date(eventDate.getTime() + estOffset * 60000);
          const currentDate = new Date();

          return (
            estDate >= currentDate ||
            estDate.toDateString() === currentDate.toDateString()
          );
        });

        //sort by date
        filteredData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });

        function formatTime(timeRange) {
          const [start, end] = timeRange.split("-");
          const startTime = start.trim();
          const endTime = end.trim();
          return `${startTime} - ${endTime}`;
        }

        //change the date format
        const finalData = filteredData.map((item) => {
          const newItem = { ...item };
          const eventDate = new Date(item.date);
          const estOffset = 5 * 60;
          const estDate = new Date(eventDate.getTime() + estOffset * 60000);
          const month = estDate.toLocaleString("en-US", { month: "long" });
          const day = estDate.getDate();
          newItem.date = `${month} ${day}`;
          if (item.time.includes("-")) {
            newItem.time = formatTime(item.time);
          } else {
            newItem.time = item.time.trim();
          }
          return newItem;
        });

        setEventData(finalData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <MenuDataContext.Provider
      value={{
        menuData,
        eventData,
        handleDeleteClick,
        loadFavoritesFromLocalStorage,
        saveFavoritesToLocalStorage,
        favorites,
        setFavorites,
        handleDeleteAllClick,
      }}
    >
      {children}
    </MenuDataContext.Provider>
  );
};

export { MenuDataContext, MenuDataProvider };
