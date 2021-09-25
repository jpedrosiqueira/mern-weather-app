import {
  findDailyForecastIcon,
  findBackgroundImg,
  isDarkForecastBg,
  isDarkTextColorBg,
} from "../components/WeatherAssets";
import RainDayBg from "../assets/backgrounds/rain-day.jpeg";

const mockData = {
  bgImg: RainDayBg,
  weatherDescription: "rain",
  isCurrentlyDay: true,
};

describe("Weather assets helper functions", () => {
  it("Should find what forecast weather icon to render based on the weather description", () => {
    const result = findDailyForecastIcon(mockData.weatherDescription);
    expect(result).toContain("rain");
  });

  it("Should find what background image will be displayed based on the weather description", () => {
    const result = findBackgroundImg(
      mockData.weatherDescription,
      mockData.isCurrentlyDay
    );
    expect(result).toContain("rain-day");
  });

  it("Should check if the forecast background container needs to switch to a darker background", () => {
    const result = isDarkForecastBg(mockData.bgImg);
    expect(result).toBe(true);
  });

  it("Should check if the text color and Day/Night icon indicator needs to switch to a darker color", () => {
    const result = isDarkTextColorBg(mockData.bgImg);
    expect(result).toBe(false);
  });
});
