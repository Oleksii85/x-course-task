import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Specificbook from "../components/SpecificBook/Specificbook";
import { useSelectedBooks } from "../hooks/use-selected-books";
import { useBooks } from "../hooks/use-books";

const selectedBooks = [];
const setSelectedBooks = jest.fn();
const books = [
  {
    id: 1,
    author: "David Flanagan",
    price: 10.99,
    image: "https://courses.prometheus.org.ua/guide.jpg",
    title: "JavaScript: The Definitive Guide, 7th Edition",
    level: "Beginner",
    tags: ["core", "frontend", "javascript"],
    amount: 42,
    shortDescription: "JavaScript is ...",
    description: "JavaScript is ...",
  },
];

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));
jest.mock("../hooks/use-selected-books");
jest.mock("../hooks/use-books");

describe("Specificbook", () => {
	beforeEach(() => {
    useSelectedBooks.mockReturnValue({
      selectedBooks,
      setSelectedBooks,
    });
    useBooks.mockReturnValue({
      books,
    });
  });

  test("Increments the number when the plus button is pressed", () => {
    render(<Specificbook />);
    const countInput = screen.getByTestId("Count");
    const plusButton = screen.getByText("+");

		userEvent.clear(countInput);
    userEvent.type(countInput, "1");
    userEvent.click(plusButton);

    expect(countInput.value).toBe("2");
  });

  test("Increments the number when the minus button is pressed", () => {
    render(<Specificbook />);
    const countInput = screen.getByTestId("Count");
    const minusButton = screen.getByText("-");

    userEvent.clear(countInput);
    userEvent.type(countInput, "5");
    userEvent.click(minusButton);

    expect(countInput.value).toBe("4");
  });

	test("When the quantity changes, the total cost must change", () => {
    render(<Specificbook />);
    const countInput = screen.getByTestId("Count");
    const totalPrice = screen.getByTestId("total-price");
		
		expect(totalPrice.textContent).toBe("10.99");

    userEvent.clear(countInput);
    userEvent.type(countInput, "10");

    expect(totalPrice.textContent).toBe("109.90");
  });

	// test("Adding a book to the cart", () => {
  //   render(<Specificbook />);
  //   const addCartButton = screen.getByTestId("button-add-card");

  //   userEvent.click(addCartButton);

  //   expect(selectedBooks.length).toBe(0);
  // });
});
