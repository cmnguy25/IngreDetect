import LandingPage from "./components/LandingPage";
import MealTimeCard from "./components/MealTimeCard";
import DishHover from "./components/DishDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Menu from "./components/FullMenu";
import ErrorPage from "./components/ErrorPage";
import { MenuDataProvider } from "./components/DataContext";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PostFoodEvent from "./components/PostFoodEvents";
import FoodEvents from "./components/FoodEvents";

export default function App() {
  return (
    <>
      <Router>
        <MenuDataProvider>
          <Layout>
            <Routes>
              <Route path="/" Component={LandingPage} />
              <Route path="/mealtime" Component={MealTimeCard} />
              <Route path="/menu/:dininghall/:mealtime" Component={Menu} />
              <Route
                path="/menu/:dininghall/:mealtime/:dish"
                Component={DishHover}
              />
              <Route path="/contact" Component={Contact} />
              <Route path="/privacy-policy" Component={PrivacyPolicy} />
              <Route path="/events" Component={FoodEvents} />
              <Route path="/admin/post-food-event" Component={PostFoodEvent} />
              <Route path="*" Component={ErrorPage} />
            </Routes>
          </Layout>
        </MenuDataProvider>
      </Router>
    </>
  );
}
