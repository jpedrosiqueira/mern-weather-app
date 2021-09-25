import { render, screen } from "@testing-library/react";
import { CityName } from "../components/CityName";
import { CurrentTemp } from "../components/CurrentTemp";

const mockData = {
  name: "San Francisco",
  weatherDescription: "Fog",
  temp: 70,
  high: 75,
  low: 50,
};

describe("Display current weather information", () => {
  it("Should display the proper city name", () => {
    render(<CityName name={mockData.name} />);
    const contentDisplayed = screen.getByText(/San Francisco/i);
    expect(contentDisplayed).toBeInTheDocument();
  });

  it("Should display the curent weather description", () => {
    render(
      <CurrentTemp
        weatherDescription={mockData.weatherDescription}
        temperature={mockData.temp}
        high={mockData.high}
        low={mockData.low}
      />
    );
    const weatherDescriptionDisplayed = screen.getByText(/Fog/i);
    const temperatureDisplayed = screen.getByText(/70/i);
    const highDisplayed = screen.getByText(/75/i);
    const lowDisplayed = screen.getByText(/50/i);

    expect(weatherDescriptionDisplayed).toBeInTheDocument();
    expect(temperatureDisplayed).toBeInTheDocument();
    expect(highDisplayed).toBeInTheDocument();
    expect(lowDisplayed).toBeInTheDocument();
  });
});
