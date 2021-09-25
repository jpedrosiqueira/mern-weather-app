import { render } from "@testing-library/react";
import { DailyForecast } from "../components/DailyForecast";
import { HourlyForecast } from "../components/HourlyForecast";

const singleForecastItem = {
  dt: 1632481200,
  sunrise: 1632462593,
  sunset: 1632506107,
  temp: { min: 57, max: 73 },
  weather: [
    {
      description: "clear sky",
      icon: "01d",
      id: 800,
      main: "Clear",
    },
  ],
};

const forecastArray = [
  singleForecastItem,
  singleForecastItem,
  singleForecastItem,
  singleForecastItem,
  singleForecastItem,
  singleForecastItem,
  singleForecastItem,
];

describe("Forecast components", () => {
  it("Should display the next six days forecast", () => {
    // The console.errors below is just to make the console cleaner,
    // when running the tests. Since we have objects being repeated
    // in our mock data (forecastArray), jest throws warnings.
    const originalError = console.error;
    console.error = jest.fn();

    const { container } = render(
      <DailyForecast allDailyWeatherArray={forecastArray} />
    );
    expect(
      container.getElementsByClassName("single-day-container").length
    ).toBe(6);
    console.error = originalError;
  });

  it("Should display the next six hours forecast", () => {
    // The console.errors below is just to make the console cleaner,
    // when running the tests. Since we have objects being repeated
    // in our mock data (forecastArray), jest throws warnings.
    const originalError = console.error;
    console.error = jest.fn();
    const { container } = render(
      <HourlyForecast allHourlyWeatherArray={forecastArray} />
    );
    expect(
      container.getElementsByClassName("single-hour-container").length
    ).toBe(6);
    console.error = originalError;
  });
});
