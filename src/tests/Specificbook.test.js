import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Specificbook from "../components/SpecificBook/Specificbook";

// const mockBook = {
//   id: 1,
//   title: "Sample Book",
//   price: 10.99,
// };

// const useParamsMock = jest.fn().mockReturnValue({ id: "1" });
// const useBooksMock = jest.fn().mockReturnValue({ books: [mockBook] });
// const useSelectedBooksMock = jest
//   .fn()
//   .mockReturnValue({ selectedBooks: [], setSelectedBooks: jest.fn() });

// jest.mock("react-router-dom", () => {
//   const actual = jest.requireActual("react-router-dom");
//   return {
//     ...actual,
//     useParams: useParamsMock,
//   };
// });

// jest.mock("../hooks/use-books", () => ({
//   useBooks: useBooksMock,
// }));

// jest.mock("../hooks/use-selected-books", () => ({
//   useSelectedBooks: useSelectedBooksMock,
// }));

describe("Specificbook", () => {
  test("збільшує кількість, коли натискається кнопка плюс", () => {
    const { getByTestId, getByText } = render(<Specificbook />);
    const countInput = getByTestId("Count");
    const plusButton = getByText("+");
    fireEvent.change(countInput, { target: { value: "1" } });
    fireEvent.click(plusButton);
    expect(countInput.value).toBe("2");
  });
});
