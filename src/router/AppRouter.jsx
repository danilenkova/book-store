import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "../routes";
import { Main } from "../layouts";

const SinginPage = lazy(() =>
  import("../pages/SinginPage" /*webpackChunkName: "singin-page" */)
);
const BooksListPage = lazy(() =>
  import("../pages/BooksListPage" /*webpackChunkName: "booklist-page" */)
);
const BookPage = lazy(() =>
  import("../pages/BookPage" /*webpackChunkName: "book-page" */)
);
const CartPage = lazy(() =>
  import("../pages/CartPage" /*webpackChunkName: "cart-page" */)
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage" /*webpackChunkName: "not-found-page" */)
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route
            index
            element={
              <PublicRoute redirectTo="/books">
                <SinginPage />
              </PublicRoute>
            }
          />
          <Route
            path="books"
            element={
              <PrivateRoute redirectTo="/">
                <BooksListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/:bookID"
            element={
              <PrivateRoute redirectTo="/">
                <BookPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute redirectTo="/">
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
