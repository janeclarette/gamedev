import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import GameFeatures from "./components/LandingPage/GameFeatures";
import LoadingPage from "./components/Homepage/LoadingPage";
import Startpage from "./components/Homepage/StartPage";
import Menu from "./components/Homepage/Menu";
import About from "./components/LandingPage/About";
import Howtoplay from "./components/Homepage/Howtoplay";
import Minigame from "./components/Homepage/Minigame";

import SavingPage from "./components/Minigames/Saving/SavingPage";
import InvestingPage from "./components/Minigames/Investing/InvestingPage";
import Gameplay from "./components/Game/Gameplay";
import { Toaster } from "react-hot-toast";

//blogs
import InvestingBlog from "./components/LandingPage/InvestingBlog";
import SavingBlogs from "./components/LandingPage/savingBlog";
import Blog from "./components/LandingPage/Blog";
import Budgeting from "./components/LandingPage/Budgeting";
import Explore from "./components/LandingPage/Explore";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "25px", // Increase font size
            padding: "25px", // Increase padding
            borderRadius: "50px", // Add rounded edges
          },
        }}
      />
      <Router>
        <Routes>
          {/* Route for Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/gameplay" element={<Gameplay />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gamefeatures" element={<GameFeatures />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/start" element={<Startpage />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/minigame" element={<Minigame />} />
          <Route path="/howtoplay" element={<Howtoplay />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/budgeting" element={<Budgeting />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saving" element={<SavingPage />} />
          <Route path="/investment" element={<InvestingPage />} />
          <Route path="/investingBlog" element={<InvestingBlog />} />
          <Route path="/savingBlog" element={<SavingBlogs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
