import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleUnit } from "../components/ToggleUnit";

describe("Changing temperature units", () => {
  it("Should change the toggle button unit from Fahrenheit to Celsius", () => {
    const changeUnit = jest.fn();
    render(<ToggleUnit changeUnit={changeUnit} />);

    const button = screen.getByRole("button", { name: /ºC/i });
    fireEvent.click(button);

    expect(changeUnit).toHaveBeenCalled();
    expect(button.classList.contains("active")).toBe(true);
  });

  it("Should change the toggle button unit from Celsius to Fahreinheit", () => {
    const changeUnit = jest.fn();
    render(<ToggleUnit changeUnit={changeUnit} />);

    const button = screen.getByRole("button", { name: /ºF/i });
    fireEvent.click(button);

    expect(changeUnit).toHaveBeenCalled();
    expect(button.classList.contains("active")).toBe(true);
  });
});
