import React from "react";
import axios from "axios";
import { CityName } from "./CityName";
import { CurrentTemp } from "./CurrentTemp";
import { SearchBar } from "./Searchbar";
import "../styles/weather-app.css";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";
import { findBackgroundImg } from "./WeatherAssets";
import SnowBg from "../assets/backgrounds/snow.jpeg";
import { isDay, IsDayOrNightIcon } from "./DayNightIndicator";
import { ToggleUnit } from "./ToggleUnit";

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      zipcode: "",
      cityName: "Winterfell",
      currentTemp: 16,
      highTemp: 23,
      lowTemp: -20,
      background: SnowBg,
      weatherDescription: "Snow",
      unit: "imperial",
      allHourlyWeather: [],
      allDailyWeather: [],
      sunriseTime: 0,
      sunsetTime: 0,
      currentTime: 0,
      isCurrentlyDay: true,
      timezone: "",
    };
  }

  fetchWeatherData = async (searchbarInput) => {
    const body = { zipCodeInput: searchbarInput, unit: this.state.unit };

    await axios.post("/search-location", body).then((res) => {
      console.log("this is the response", res);

      // We only need city name, high temperature and low from
      // the currentWeather data fetched
      const currentWeatherData = res.data.currentWeatherData;

      this.setState({
        cityName: currentWeatherData.name,
        highTemp: currentWeatherData.main.temp_max,
        lowTemp: currentWeatherData.main.temp_min,
        forecastData: res.data.forecastData,
      });
    });
  };

  handleSubmit = (searchbarInput) => {
    this.fetchWeatherData(searchbarInput).then(() => {
      const forecastData = this.state.forecastData;
      this.setState({
        currentTemp: forecastData.current.temp,
        weatherDescription: forecastData.current.weather[0].main,
        allHourlyWeather: forecastData.hourly,
        allDailyWeather: forecastData.daily,
        sunriseTime: forecastData.current.sunrise,
        sunsetTime: forecastData.current.sunset,
        currentTime: forecastData.current.dt,
        timezone: forecastData.timezone,
      });
      this.setState({
        zipcode: searchbarInput,
        isCurrentlyDay: isDay(
          this.state.currentTime,
          this.state.sunsetTime,
          this.state.sunriseTime
        ),
      });
      this.setState({
        background: findBackgroundImg(
          this.state.weatherDescription.toLowerCase(),
          this.state.isCurrentlyDay
        ),
      });
    });
  };

  fetchNewTemperatures = () => {
    this.fetchWeatherData(this.state.zipcode).then(() => {
      const forecastData = this.state.forecastData;
      this.setState({
        currentTemp: forecastData.current.temp,
        allHourlyWeather: forecastData.hourly,
        allDailyWeather: forecastData.daily,
      });
    });
  };

  handleChangeUnit = (unitSelected) => {
    this.setState(
      {
        unit: unitSelected,
      },
      this.fetchNewTemperatures
    );
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${this.state.background}`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="header-container">
            <div className="search-bar">
              <SearchBar onSubmit={this.handleSubmit} />
            </div>
            <div className="toggle-button-container">
              <ToggleUnit changeUnit={this.handleChangeUnit} />
            </div>
            <div className="day-night-icon">
              <IsDayOrNightIcon isCurrentlyDay={this.state.isCurrentlyDay} />
            </div>
          </div>
          <div className="city-dailyforecast-content">
            <div className="city-name">
              <CityName name={this.state.cityName} />
            </div>
            <div className="daily-forecast">
              <DailyForecast
                allDailyWeatherArray={this.state.allDailyWeather}
              />
            </div>
          </div>
          <div className="temp-hourlyforecast-content">
            <div className="current-temp">
              <CurrentTemp
                temperature={this.state.currentTemp}
                description={this.state.weatherDescription}
                high={this.state.highTemp}
                low={this.state.lowTemp}
              />
            </div>
            <div className="hourly-forecast">
              <HourlyForecast
                allHourlyWeatherArray={this.state.allHourlyWeather}
                currTemp={this.state.currentTemp}
                currentTime={this.state.currentTime}
                sunset={this.state.sunsetTime}
                sunrise={this.state.sunriseTime}
                timezone={this.state.timezone}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
