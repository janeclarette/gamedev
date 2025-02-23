import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const authenticate = (data, next) => {
  if (window !== "undefined") {
    // console.log('authenticate', response)
    sessionStorage.setItem("token", JSON.stringify(data.access_token));
    // sessionStorage.setItem("user", JSON.stringify(data.user));
  }
  next();
};

export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};
export const getTheEmailFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // Decode JWT payload
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));

    console.log("Decoded Payload:", decodedPayload); // Debug the payload

    // Try different keys for the user ID
    return (
      decodedPayload.user_id || decodedPayload.id || decodedPayload.sub || null
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// access user name from session storage
export const getUserWithToken = () => {
  if (typeof window !== "undefined") {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (user && token) {
      return {
        user: JSON.parse(user), // Parse the stored user data
        token: JSON.parse(token), // Parse the stored token
      };
    } else {
      return false; // Return false if either is missing
    }
  }
  return false; // Return false if `window` is undefined
};

// remove token from session storage
export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    console.log("User logged out!");
    console.log("Token after logout:", getToken()); // Output: ""
  }
  next();
};

export const errMsg = (message = "") =>
  toast.error(message, {
    position: "bottom-right",
  });
export const successMsg = (message = "") =>
  toast.success(message, {
    position: "bottom-right",
  });
