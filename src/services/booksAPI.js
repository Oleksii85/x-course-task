export const getBooks = () => {
  return fetch("./books.json").then((response) => response.json());
};
