import { render, screen } from "@testing-library/react";
import App from "./App";

it("Should render greeting message on first page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Weather App/i);
  expect(linkElement).toBeInTheDocument();
});
