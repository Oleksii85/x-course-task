import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { LocalStorageService, LS_KEYS } from "./services/localStorage";
import { UserProvider } from "./hooks/use-user";
import { BooksProvider } from "./hooks/use-books";
import { SelectedBooksProvider } from "./hooks/use-selected-books";
import { getBooks } from "./services/booksAPI";
import Layout from "./components/Layout/Layout";
import Signin from "./components/Auth/Signin";
import Cartscreen from "./components/Cart/Cartscreen";
import Specificbook from "./components/SpecificBook/Specificbook";
import Booklist from "./components/BookList/Booklist";
import NotFoundPage from "./components/NotFound/404";
import "./App.scss";

function App() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(LocalStorageService.get(LS_KEYS.USER));
  const [selectedBooks, setSelectedBooks] = useState(
    LocalStorageService.get(LS_KEYS.SELECTED_BOOKS) || []
  );

  const isAuthenticatedUser = !!user;

  useEffect(() => {
    getBooks().then((data) => setBooks(data.books));
  }, []);

  return (
    <ErrorBoundary>
      <UserProvider value={{ user, setUser }}>
        <BooksProvider value={{ books }}>
          <SelectedBooksProvider value={{ selectedBooks, setSelectedBooks }}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
										isAuthenticatedUser ? (
											<Navigate to="/book-list" />
											) : (
												<Navigate to="/sign-in" />
												)
											}
                />
								<Route path="/sign-in" element={<Signin />} />
                <Route
                  path="/book-list"
                  element={
                    isAuthenticatedUser ? <Booklist /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/specific-book/:id"
                  element={
                    isAuthenticatedUser ? <Specificbook /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/cart-screen"
                  element={
                    isAuthenticatedUser ? <Cartscreen /> : <Navigate to="/" />
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </SelectedBooksProvider>
        </BooksProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
