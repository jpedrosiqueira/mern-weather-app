import { isDay } from "../components/DayNightIndicator";
import { convertUnixToWeekday } from "../components/DailyForecast";
import { convertUnixToHourWithTimezone } from "../components/HourlyForecast";

const mockData = {
  dt: 1632507757,
  sunset: 1632535420,
  sunrise: 1632491966,
  timezone: "America/Los_Angeles",
};

describe("Helper functions involving time", () => {
  it("Should tell if it is currently day based on a specific time, the sunset time, and the sunrise time", () => {
    const result = isDay(mockData.dt, mockData.sunset, mockData.sunrise);

    expect(result).toBe(true);
  });

  it("Should convert a Unix time to the proper weekday", () => {
    const result = convertUnixToWeekday(mockData.dt);

    expect(result).toEqual("Friday");
  });

  it("Should convert Unix time to the proper time, considering the location timezone", () => {
    const result = convertUnixToHourWithTimezone(
      mockData.dt,
      mockData.timezone
    );

    expect(result).toEqual("11AM");
  });
});
