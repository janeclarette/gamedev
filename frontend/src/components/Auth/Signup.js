import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCalendar } from "react-icons/fi"; // Import icons
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import Google and Facebook icons
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    img: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        console.log(data);
        navigate("/login");
      } else {
        alert(data.detail || "Signup failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-auth-page">
      <div className="signup-auth-container">
        <div className="signup-logo">Finance Quest</div>
        <h2 className="signup-title">Create New Account</h2>
        <p className="signup-subtitle">Sign up to continue</p>
        <div className="signup-divider"></div>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="signup-form-row">
            <div className="signup-input-container">
              <FiUser className="signup-input-icon" />
              <input
                type="text"
                name="username"
                placeholder="janeclarette"
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-input-container">
              <FiMail className="signup-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="jane@gmail.com"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="signup-form-row">
            <div className="signup-input-container">
              <FiCalendar className="signup-input-icon" />
              <input
                type="date"
                name="birthday"
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-input-container">
              <FiLock className="signup-input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label className="signup-label">Upload Image</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="signup-file-input"
          />
          <button type="submit" className="signup-auth-btn">Signup</button>
        </form>
        <div className="signup-social-login">
          <button className="signup-google-btn">
            <FaGoogle className="signup-social-icon" /> Google
          </button>
          <button className="signup-facebook-btn">
            <FaFacebook className="signup-social-icon" /> Facebook
          </button>
        </div>
        <p className="signup-login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
