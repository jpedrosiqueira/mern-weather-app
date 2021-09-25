import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../components/Searchbar";
import { ErrorMessage } from "../components/ErrorMessage";

describe("Search bar input", () => {
  it("Should handle when user submits an empty string", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<SearchBar onSubmit={handleSubmit} />);
    fireEvent.submit(getByTestId("form"));

    expect(handleSubmit).not.toHaveBeenCalled();
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

  it("Should display error message if city can not be found", () => {
    render(<ErrorMessage displayMsg={true} />);

    expect(
      screen.getByText(
        "Sorry, could not find location. Please type a valid city name."
      )
    ).toBeVisible();
  });
});
