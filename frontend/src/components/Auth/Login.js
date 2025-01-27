import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi"; // Import icons for email and password
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons for Google and Facebook
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        console.log(data);
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-auth-page">
      <div className="login-auth-container">
        <div className="login-logo">Finance Quest</div>
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Sign in to continue</p>
        <div className="login-divider"></div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-container">
            <FiMail className="login-input-icon" />
            <input
              type="email"
              placeholder="jane@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-container">
            <FiLock className="login-input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-auth-btn">Login</button>
        </form>
        <div className="login-social-login">
          <button className="login-google-btn">
            <FaGoogle className="login-social-icon" /> Google
          </button>
          <button className="login-facebook-btn">
            <FaFacebook className="login-social-icon" /> Facebook
          </button>
        </div>
        <p className="login-signup-link">
          Don’t have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
