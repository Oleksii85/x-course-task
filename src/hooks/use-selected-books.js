import { useContext, createContext } from "react";

export const SelectedBooksContext = createContext(null);
export const SelectedBooksProvider = SelectedBooksContext.Provider;
export const useSelectedBooks = () => useContext(SelectedBooksContext);
