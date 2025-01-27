import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
        <div className="particles">
        {[...Array(100)].map((_, i) => (
            <div key={i} className="particle"></div>
        ))}
        </div>


      <nav className="navbar">
        <div className="logo">Finance Quest</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/start-journey">Start Journey</a></li>
          <li><a href="/gamefeatures">Game Features</a></li>
        </ul>
        <Link to="/signup">
          <button className="sign-in">Sign In</button>
        </Link>
      </nav>

      <div className="hero-section">
        <h1 className="hero-title">MASTER YOUR FINANCES, ONE DECISION AT A TIME</h1>
        <p className="hero-subtitle">
          Learn to budget, save, and invest through engaging real-life scenarios.
        </p>
        <Link to="/signup">
          <button className="sign-in">Sign In</button>
        </Link>
      </div>

      <div className="help">Help</div>
    </div>
  );
};

export default LandingPage;
