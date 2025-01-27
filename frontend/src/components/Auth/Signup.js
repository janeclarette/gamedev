import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCalendar } from "react-icons/fi"; // Import icons
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import Google and Facebook icons
import axios from "axios"; // Import Axios
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

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent page reload

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("birthday", formData.birthday);
    form.append("disabled", false);
    if (formData.img) {
      form.append("img", formData.img);
    } else {
      console.error("No image file selected.");
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);

      // Navigate to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
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
                value={formData.username}
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
                value={formData.email}
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
                value={formData.birthday}
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
                value={formData.password}
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
