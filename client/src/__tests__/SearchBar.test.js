import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "../components/Searchbar";

describe("Search bar input", () => {
  it("Should handle when user submits a city name", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<SearchBar onSubmit={handleSubmit} />);
    fireEvent.submit(getByTestId("form"));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("Should handle when user types a city name", () => {
    const handleSubmit = jest.fn();
    const { queryByPlaceholderText, getByTestId } = render(
      <SearchBar onSubmit={handleSubmit} />
    );
    const searchInput = queryByPlaceholderText("Type in a city name...");
    fireEvent.change(searchInput, { target: { value: "San Francisco" } });

    expect(searchInput.value).toBe("San Francisco");

    // After user inputs a city name and submits,
    // expect the input field to reset to ""
    fireEvent.submit(getByTestId("form"));
    expect(searchInput.value).toBe("");
  });
  //   it("Should display error message if city can not be found", () => {});
});
