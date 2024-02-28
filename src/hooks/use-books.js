import { useContext, createContext } from "react";

export const BooksContext = createContext(null);
export const BooksProvider = BooksContext.Provider;
export const useBooks = () => useContext(BooksContext);
