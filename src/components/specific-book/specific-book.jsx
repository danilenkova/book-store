import React, { useEffect, useState } from "react";
import { useCart } from "../../context/use-cart";
import { useParams } from "react-router-dom";

import { useBooks } from "../../context/use-books";

import imageNotFound from "../../images/imageNotFound.png";

import "./specific-book.css";

export const SpecificBook = () => {
  const books = useBooks();
  let { bookID } = useParams();
  const { cart, setCart } = useCart();
  const book = books?.find((item) => item.id === +bookID);

  const [quantity, setQuantity] = useState(
    cart?.books?.filter((item) => item.id === book.id)[0]?.quantity || 1
  );
  const [total, setTotal] = useState();
  const inCart = cart?.books?.some((item) => item.id === book.id) || false;
  useEffect(() => {
    setTotal(((quantity || 1) * book.price).toFixed(2));
  }, [quantity, book.price]);

  const descrementCount = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const incrementCount = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleCountChange = (e) => {
    const inputCount = checkCount(e.target.value);
    setQuantity(inputCount);
  };

  const checkCount = (value) => {
    if (value === "") return "";
    else if (isNaN(value) || value < 1) return 1;
    else if (value > 42) return 42;
    else return Number(value);
  };

  const handleAddToCart = () => {
    const orderToCart = { books: [] };
    orderToCart.books = cart?.books
      ? cart.books.filter((item) => item.id !== book.id)
      : [];
    orderToCart.books.push(
      ...[
        {
          id: book?.id,
          price: book?.price,
          title: book?.title,
          quantity: quantity,
        },
      ]
    );
    setCart(orderToCart);
  };

  return (
    <section>
      <div className="book-info">
        <div className="bookWrap">
          <img
            src={book.image || imageNotFound}
            className="book-image"
            alt="not found"
            width="200px"
            height="200px"
          />
        </div>
        <div className="wrapper">
          <div className="book-info-box">
            <p>
              <strong>{book.title}</strong>
            </p>
            <p>Author(s): {book.author}</p>
            <p>Book level: {book.level}</p>

            <p>Book tags: {book.tags.join(", ")}</p>
          </div>
          <div className="order-box">
            <div className="price-box">
              <p>Price, $</p>
              <p className="price">{book.price}</p>
            </div>
            <div className="count-form">
              <div>Count</div>
              <div className="countInput">
                <button
                  type="button"
                  className="descrementBtn"
                  onClick={descrementCount}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input
                  id="book-number"
                  type="number"
                  className="count"
                  value={quantity}
                  onChange={handleCountChange}
                  min="1"
                  max="42"
                />
                <button
                  type="button"
                  className="incrementBtn"
                  onClick={incrementCount}
                  disabled={quantity === book.amount}
                >
                  +
                </button>
              </div>
            </div>
            <div className="total-box">
              <p>Total price </p>
              <p className="total">{total}</p>
            </div>
            <button
              type="button"
              className="btn-order"
              onClick={handleAddToCart}
            >
              {inCart ? "In cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="description">
        <p>{book.description}</p>
      </div>
    </section>
  );
};
