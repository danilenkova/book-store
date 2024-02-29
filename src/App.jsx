import { useState, useEffect } from "react";

import getBooks from "./services/BookAPI";

import { BooksProvider } from "./context/use-books";
import { CartProvider } from "./context/use-cart";
import "./App.css";

import { AppRouter } from "./router/AppRouter";

function App() {
  const books = getBooks();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || { books: [] }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BooksProvider value={books}>
      <CartProvider value={{ cart, setCart }}>
        <div className="App">
          <AppRouter />
        </div>
      </CartProvider>
    </BooksProvider>
  );
}

export default App;
