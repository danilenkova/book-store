import { useState } from "react";

import avatar from "../../images/avatar.png";
import "./singin.css";

export const Singin = () => {
  const [user, setUser] = useState("");

  const handleLoginChange = (e) => {
    const value = e.target.value;
    setUser(value);
  };

  const handleFormSubmit = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser("");
  };

  return (
    <div className="loginForm" onSubmit={handleFormSubmit}>
      <img src={avatar} alt="user" className="user-foto" />
      <form className="sing-in-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your Username"
          name="username"
          className="form-control"
          value={user}
          onChange={handleLoginChange}
        />
        <button
          type="submit"
          className="btn btn-outline-secondary sing-in-btn"
          disabled={user.length < 4 || user.length > 16}
        >
          Sign-in
        </button>
      </form>
    </div>
  );
};
