import { useState, useEffect } from "react";

import getBooks from "./services/BookAPI";

import { BooksProvider } from "./context/use-books";
// import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/use-cart";
import "./App.css";

import { AppRouter } from "./router/AppRouter";

function App() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("login")));
  const books = getBooks();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || { books: [] }
  );

  // useEffect(() => {
  //   if (user) localStorage.setItem("login", JSON.stringify);
  //   else localStorage.removeItem("login");
  // }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    // <UserProvider value={{ user, setUser }}>
    <BooksProvider value={books}>
      <CartProvider value={{ cart, setCart }}>
        <div className="App">
          <AppRouter />
        </div>
      </CartProvider>
    </BooksProvider>
    // </UserProvider>
  );
}

export default App;
