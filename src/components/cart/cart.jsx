import { NavLink } from "react-router-dom";

import { useCart } from "../../context/use-cart";
import cartEmpty from "../../images/cart.svg";

import "./cart.css";

export const Cart = () => {
  const { cart, setCart } = useCart();

  const handleRemove = () => {
    setCart({ books: [] });
  };

  return (
    <div className="cart-container">
      <button
        type="button"
        className="purchaseBtn"
        onClick={handleRemove}
        disabled={cart?.books?.length === 0}
      >
        Purchase
      </button>
      {cart.books.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.books.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <NavLink to={`/books/${item.id}`}>{item.title}</NavLink>
                </div>
                <div>
                  <p>Items: {item.quantity}</p>
                </div>
                <div>
                  <p>${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="totalPrice">
            Total price: $
            {cart?.books
              ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
        </>
      ) : (
        <>
          <img src={cartEmpty} alt="cart empty" className="empty-cart-image" />
          <p>Cart empty...</p>
        </>
      )}
    </div>
  );
};
