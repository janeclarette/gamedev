import React from "react";
import "./LandingPage.css"; // Import custom styles if needed

const LandingPage = () => {
  return (
    <div
      className="landing-page relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your actual image
      }}
    >
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="text-white text-xl font-bold">FinanceQuest</div>

        {/* Navigation */}
        <nav className="space-x-6">
          <a href="#home" className="text-white text-lg hover:underline">
            Home
          </a>
          <a href="#start" className="text-white text-lg hover:underline">
            Start Journey
          </a>
          <a href="#features" className="text-white text-lg hover:underline">
            Game Features
          </a>
          <a href="/signup" className="text-white text-lg hover:underline">
            Sign In
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-full text-center text-white">
        {/* Main Heading */}
        <h1 className="text-5xl font-bold mb-4">Master Your Finances, One Decision at a Time</h1>

        {/* Sub-Text */}
        <p className="text-2xl mb-8">
        Learn to budget, save, and invest through engaging real-life scenarios.
        </p>

        {/* Sign-In Button */}
        <a href="/signup">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white rounded-xl text-lg font-semibold">
            Sign In to Start
          </button>
        </a>
      </main>
    </div>
  );
};

export default LandingPage;
