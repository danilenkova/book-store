import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscSearch, VscChromeClose } from "react-icons/vsc";

import { useBooks } from "../../context/use-books";
import imageNotFound from "../../images/imageNotFound.png";
import "./book-list.css";

export const BookList = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("all");
  const books = useBooks();
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilter(searchText);
  };

  const handleSelectChange = (e) => {
    setSort(e.target.value);
  };

  const getNormalizeText = (text) => text.toLowerCase();

  const getFilteredBooksData = (data, filter) => {
    return data
      .filter(({ title }) =>
        getNormalizeText(title).includes(getNormalizeText(filter))
      )
      .filter((book) => {
        if (sort === "all") {
          return book;
        } else if (sort === "to15") {
          if (book.price <= 15) {
            return book;
          }
        } else if (sort === "to30") {
          if (book.price >= 15 && book.price <= 30) {
            return book;
          }
        } else if (sort === "after30") {
          if (book.price >= 30) {
            return book;
          }
        }
      });
  };

  const onFilterRemove = () => {
    setFilter("");
  };

  const filteredBooks = getFilteredBooksData(books, filter);

  return (
    <>
      <div className="filters">
        <div className="searchInputBox">
          <input
            placeholder="Search by book name"
            className="searchInput"
            value={filter}
            onChange={handleFilterChange}
          />
          {filter ? (
            <button
              type="button"
              className="escapeBtn"
              onClick={onFilterRemove}
            >
              <VscChromeClose />
            </button>
          ) : null}
          <button type="submit" className="searchBtn" title="search">
            <VscSearch />
          </button>
        </div>
        <select
          name="price"
          className="filterSelect"
          onChange={handleSelectChange}
        >
          <option value="all">All books</option>
          <option value="to15">up to $15</option>
          <option value="to30">$15 - $30</option>
          <option value="after30">$30+</option>
        </select>
      </div>
      {filteredBooks ? (
        <div className="books-section">
          <ul className="books-list">
            {filteredBooks.map((book) => (
              <li className="book-item" key={book.id}>
                <div className="book-wrapper">
                  <img src={book.image || imageNotFound} alt={book.title} />
                </div>
                <div className="book-description">
                  <p className="book-title">
                    {book.title.length <= 24
                      ? book.title
                      : book.title.slice(0, 24) + "..."}
                  </p>
                  <p>
                    {book.author.length <= 24
                      ? book.author
                      : book.author.slice(0, 24) + "..."}
                  </p>
                  <p className="book-price">
                    <strong>$ {book.price}</strong>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/books/${book.id}`);
                      }}
                      className="bookBtn"
                    >
                      View
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Book not found</p>
        </div>
      )}
    </>
  );
};
