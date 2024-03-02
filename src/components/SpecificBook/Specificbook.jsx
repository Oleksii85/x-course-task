import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../../hooks/use-books";
import { useSelectedBooks } from "../../hooks/use-selected-books";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";
import imageNotFound from "../../images/imageNotFound.png";
import "./specificbook.scss";

export default function Specificbook() {
  const { selectedBooks, setSelectedBooks } = useSelectedBooks();
  const { id } = useParams();
  const { books } = useBooks();
  const inputRef = useRef(null);
  const book = books.find((item) => item.id === parseInt(id));
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(book ? book.price : 0);

  const handleAddToCart = () => {
    const cart = [...selectedBooks];
    const existingBook = selectedBooks.find((item) => item.id === book.id);
    existingBook
      ? (existingBook.count += count)
      : cart.push({
          id: book?.id,
          price: book?.price,
          title: book?.title,
          count: count,
        });
    LocalStorageService.set(LS_KEYS.SELECTED_BOOKS, cart);
    setSelectedBooks(cart);
  };

  const validateCount = (countBooks) => {
    if (isNaN(countBooks)) {
      countBooks = "";
    } else if (countBooks < 1) {
      countBooks = 1;
    } else if (countBooks > 42) {
      countBooks = 42;
    }
    return countBooks;
  };

  const handleChangeCount = (event) => {
    const newCount = validateCount(parseInt(event.target.value));
    setCount(newCount);
  };

  const handleValueMinus = () => {
    setCount((prevCount) => validateCount(prevCount - 1));
  };

  const handleValuePlus = () => {
    setCount((prevCount) => validateCount(prevCount + 1));
  };

	const calculateTotalPrice = () => book.price * count;

  useEffect(() => {
    if (book) {
      const newTotalPrice = calculateTotalPrice();
      setTotalPrice(newTotalPrice.toFixed(2));
    }
  }, [count, book]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <main>
        {book ? (
          <div className="main-specificbook">
            <div className="book">
              <div className="book-image">
                <img
                  src={!book.image.length ? imageNotFound : book.image}
                  alt={book.title}
                />
              </div>
              <div className="book-title">
                <h1 className="title">{book.title}</h1>
                <p>Author(s): {book.author}</p>
                <p>Book level: {book.level}</p>
                <p>
                  Book tags: {book.tags[0]}, {book.tags[1]}, {book.tags[2]}
                </p>
              </div>
              <div className="book-description">
                <p>{book.description}</p>
              </div>
            </div>
            <div className="book-container">
              <div className="book-price-container">
                <div className="price">
                  <p>Price, $</p>
                  <span id="priceBook" data-testid="Price">
                    {book.price}
                  </span>
                </div>
                <div className="count">
                  <p>Count</p>
                  <div className="count-block">
                    <button
                      type="button"
                      className="btn-minus"
                      id="countMinus"
                      disabled={count === 1}
                      onClick={handleValueMinus}
                    >
                      -
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      id="inputCount"
                      data-testid="Count"
                      className="input-count"
                      onChange={handleChangeCount}
                      value={count}
                    />
                    <button
                      type="button"
                      className="btn-plus"
                      id="countPlus"
                      data-testid="plus-button"
                      disabled={count === 42}
                      onClick={handleValuePlus}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="total-price">
                  <p>Total price, $</p>
                  <span id="totalPrice" data-testid="total-price">
                    {totalPrice}
                  </span>
                </div>
                <div className="btn-add-to-cart">
                  <button
                    type="submit"
                    id="buttonAddCard"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Book not found</div>
        )}
      </main>
    </>
  );
}
