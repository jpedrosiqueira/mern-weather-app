import { render, screen } from "@testing-library/react";
import { IsDayOrNightIcon } from "../components/DayNightIndicator";

describe("Day or night icon indicator", () => {
  it("Should display sun icon if it is currently day", () => {
    render(<IsDayOrNightIcon isCurrentlyDay={true} />);
    const iconDisplayed = screen.getByAltText(/day/i);

    expect(iconDisplayed).toBeInTheDocument();
  });

  it("Should display moon icon if it is currently night", () => {
    render(<IsDayOrNightIcon isCurrentlyDay={false} />);
    const iconDisplayed = screen.getByAltText(/night/i);

    expect(iconDisplayed).toBeInTheDocument();
  });
});
