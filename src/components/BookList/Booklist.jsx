import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../../hooks/use-books";
import searchImage from "../../images/icons/search.svg";
import imageNotFound from "../../images/imageNotFound.png";
import "./booklist.scss";

export default function Booklist() {
  const { books } = useBooks();
  const [filterTitle, setFilterTitle] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");

  const handleFilterTitleChange = (event) => {
    setFilterTitle(event.target.value);
  };

  const handleFilterPriceChange = (event) => {
    setFilterPrice(event.target.value);
  };

  const filteredBooksPrice = books.filter((book) => {
    if (filterPrice === "15") {
      return book.price <= 15;
    } else if (filterPrice === "15_30") {
      return book.price > 15 && book.price <= 30;
    } else if (filterPrice === "30") {
      return book.price > 30;
    } else {
      return true;
    }
  });

  const filteredBooks = filteredBooksPrice.filter((element) =>
    element.title.toLowerCase().includes(filterTitle.toLowerCase())
  );

  return (
    <>
      <main>
        <div className="block-search-sort">
          <div className="search-books">
            <input
              type="text"
              id="searchBook"
              className="input-search-book"
              placeholder="Search by book name"
              value={filterTitle}
              onChange={handleFilterTitleChange}
            />
            <div className="book-search">
              <img src={searchImage} alt="search" />
            </div>
          </div>
          <div className="sort-books">
            <select
              id="sortBook"
              value={filterPrice}
              onChange={handleFilterPriceChange}
            >
              <option value="all">All</option>
              <option value="15">up to $15</option>
              <option value="15_30">from $15 to $30</option>
              <option value="30">$30 or more</option>
            </select>
          </div>
        </div>
        <div className="list-book-container" id="listBooks">
          {books ? (
            filteredBooks.map((book) => (
              <div className="book-item" key={book.id}>
                <div className="item-img">
                  {book.image.length === 0 ? (
                    <img
                      src={imageNotFound}
                      alt={book.title}
                      className="item-img-image"
                      style={{ pointerEvents: "none" }}
                    />
                  ) : (
                    <Link to={`/specific-book/${book.id}`}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="item-img-image"
                      />
                    </Link>
                  )}
                </div>
                <div className="book-item-block">
                  <div className="book-item-title">
                    <h2 className="item-title">{book.title}</h2>
                  </div>
                  <div className="book-item-author">
                    <p className="item-author">{book.author}</p>
                  </div>
                  <div className="book-item-price">
                    <div className="item-price">
                      $ <span className="item-book-price">{book.price}</span>
                    </div>
                    <Link to={`/specific-book/${book.id}`}>
                      <button type="submit" className="item-btn">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Books not found</div>
          )}
        </div>
      </main>
    </>
  );
}
