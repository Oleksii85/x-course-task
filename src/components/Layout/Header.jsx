import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";
import { useUser } from "../../hooks/use-user";
import { useSelectedBooks } from "../../hooks/use-selected-books";
import cart from "../../images/icons/cart.svg";
import avatar from "../../images/avatar.png";
import "./header.scss";

export default function Header() {
  const { user, setUser } = useUser();
  const { selectedBooks, setSelectedBooks } = useSelectedBooks();
	const [totalCount, setTotalCount] = useState(0);
	

  const handleSignOut = () => {
    LocalStorageService.remove(LS_KEYS.USER);
    setUser(null);
		LocalStorageService.remove(LS_KEYS.SELECTED_BOOKS);
    setSelectedBooks([]);
  };

  const totalCountBooks = useCallback(() => {
    let totalBooks = 0;
    selectedBooks.forEach(item => totalBooks += item.count);
    setTotalCount(totalBooks);
  }, [selectedBooks]);

  useEffect(() => {
    totalCountBooks();
  });

  return (
    <>
      <header>
        <div className="header-container">
          <Link to="book-list" className="header-link">
            X-course task / Baiev Oleksii
          </Link>
          <nav className="nav-menu">
            <ul className="menu-list">
              <li className="list-cart">
                <Link to="/cart-screen">
                  <img src={cart} id="cart" alt="cart" />
                </Link>
                {totalCount > 0 && <div className="cart-count">{totalCount}</div>}
              </li>
              <li className="list-btn-signout">
                <Link to="/">
                  <button
                    type="submit"
                    className="btn-signout"
                    onClick={handleSignOut}
                  >
                    Sign-Out
                  </button>
                </Link>
              </li>
              <li className="list-avatar-username">
                <img src={avatar} alt="avatar" className="list-avatar" />
                <p className="list-username">{user ? user : "username"}</p>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
