import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelectedBooks } from "../../hooks/use-selected-books";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";
import cart from "../../images/icons/cart.svg";
import xmark from "../../images/icons/xmark.svg";
import "./cartscreen.scss";

export default function Cartscreen() {
  const { selectedBooks, setSelectedBooks } = useSelectedBooks();
	const [total, setTotal] = useState();

  const handlePurchase = () => {
    LocalStorageService.remove(LS_KEYS.SELECTED_BOOKS);
    setSelectedBooks([]);
  };
	
	const changeTotalPrice = useCallback(() => {
    let totalBooksPrice = 0;
    selectedBooks.forEach(
      (item) => (totalBooksPrice += item.price * item.count)
    );
    setTotal(totalBooksPrice.toFixed(2));
  }, [selectedBooks]);

	const handleRemoveBook = (bookId) => {
  	const notRemovedBooks = selectedBooks.filter((book) => book.id !== bookId);
		LocalStorageService.set(LS_KEYS.SELECTED_BOOKS, notRemovedBooks);
		setSelectedBooks(notRemovedBooks);
	};

	useEffect(() => {
    changeTotalPrice();
  });

  return (
    <>
      <main>
        <div className="main-cartscreen">
          <div className="block-btn-purchase">
            <button
              type="submit"
              className="btn-purchase"
              disabled={selectedBooks.length < 1}
              onClick={handlePurchase}
            >
              Purchase
            </button>
          </div>
          {selectedBooks.length > 0 ? (
            <div className="block-cart-books">
              <div className="cart-books-head">
                <div className="books-head-title">Title</div>
                <div className="books-head-count">Count</div>
                <div className="books-head-price">Price</div>
                <div className="books-head-total">Total</div>
              </div>
              {selectedBooks.map((book) => (
                <div className="book-item" key={book.id}>
                  <div className="cart-books">
                    <Link
                      to={`../specific-book/${book.id}`}
                      className="book-title"
                    >
                      {book.title}
                    </Link>
                  </div>
                  <div className="book-count">
                    <span id="countBook">{book.count}</span>
                  </div>
                  <div className="book-price">
                    $ <span id="countBook">{book.price}</span>
                  </div>
                  <div className="book-total-price">
                    ${" "}
                    <span id="priceBook">
                      {(book.count * book.price).toFixed(2)}
                    </span>
                    <span
                      onClick={() => handleRemoveBook(book.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={xmark} alt="remove" />
                    </span>
                  </div>
                </div>
              ))}
              <div className="block-total-price">
                Total price: $ <span id="totalPrice">{total}</span>
              </div>
            </div>
          ) : (
            <div className="cart-empty">
              <img src={cart} alt="cart" />
              <div>Cart empty!</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
