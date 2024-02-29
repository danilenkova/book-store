import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useCart } from "../../context/use-cart";

import cartImg from "../../images/cart.svg";
import avatar from "../../images/avatar.png";

import "./header.css";
import { useUser } from "../../context/use-user";

export const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const user = useUser();
  const { cart } = useCart();
  const [booksInCart, setBooksInCart] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setBooksInCart(
      cart?.books?.reduce((accu, curr) => accu + Number(curr.quantity), 0) || 0
    );
  }, [cart]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to={"/"}>
          <p className="site-title">X-course task / Yuliia Danilenkova</p>
        </NavLink>
        {user ? (
          <div className="user-menu">
            <NavLink to={"/cart"}>
              <div className="cart">
                <img src={cartImg} alt="cart" className="header-cart" />
                <p className="inCart">{booksInCart || 0}</p>
              </div>
            </NavLink>
            <button
              type="submit"
              className="btn-singout"
              onClick={handleSignOut}
            >
              Sign-Out
            </button>
            <img className="user-avatar" src={avatar} alt="avatar" />
            <p>{user}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
};

{
  /* <div className="user-menu">
  <NavLink to={"/cart"}>
    <div className="cart">
      <img src={cartImg} alt="cart" className="header-cart" />
      <p className="inCart">{booksInCart || 0}</p>
    </div>
  </NavLink>
  <button type="submit" className="btn-singout" onClick={handleSignOut}>
    Sign-Out
  </button>
  <img className="user-avatar" src={avatar} alt="avatar" />
  <p>{user}</p>
</div>; */
}
