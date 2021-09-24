import React from "react";
import axios from "axios";
import { CityName } from "./CityName";
import { CurrentTemp } from "./CurrentTemp";
import { SearchBar } from "./Searchbar";
import "../styles/weather-app.css";
import { HourlyForecast } from "./HourlyForecast";
import { DailyForecast } from "./DailyForecast";
import {
  findBackgroundImg,
  isDarkForecastBg,
  isDarkTextColorBg,
} from "./WeatherAssets";
import SnowBg from "../assets/backgrounds/snow.jpeg";
import { isDay, IsDayOrNightIcon } from "./DayNightIndicator";
import { ToggleUnit } from "./ToggleUnit";

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
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

  // Based on Searchbar input, fetch data from our API
  fetchWeatherData = async (searchbarInput) => {
    const body = { cityName: searchbarInput, unit: this.state.unit };

    await axios
      .post("/search-location", body)
      .then((res) => {
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
      })
      .catch((err) => console.log(err.response.data));
  };

  // On submit, fetch our data based on the input.
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
      // After some information from state has been set,
      // set more information based on those.
      this.setState({
        inputField: searchbarInput,
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

  // Fetch from API when the temperature unit changes
  fetchNewTemperatures = () => {
    this.fetchWeatherData(this.state.cityName).then(() => {
      const forecastData = this.state.forecastData;
      this.setState({
        currentTemp: forecastData.current.temp,
        allHourlyWeather: forecastData.hourly,
        allDailyWeather: forecastData.daily,
      });
    });
  };

  handleChangeUnit = (unitSelected) => {
    // To avoid fetching the data when clicking on a unit
    // that has been already selected, here we only fetch new
    // data if the unit selected is different than current unit
    unitSelected !== this.state.unit &&
      this.setState(
        {
          unit: unitSelected,
        },
        this.fetchNewTemperatures
      );
  };

  render() {
    const isDynamicForecastBackground = isDarkForecastBg(this.state.background);
    const isDynamicTextColor = isDarkTextColorBg(this.state.background);

    // Set the app background based on the current weather
    let backgroundStyle = {
      backgroundImage: `url(${this.state.background}`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    };
    return (
      <div style={backgroundStyle}>
        <div className="container">
          <div className="header-container">
            <div className="search-bar">
              <SearchBar onSubmit={this.handleSubmit} />
            </div>
            <div className="toggle-button-container">
              <ToggleUnit changeUnit={this.handleChangeUnit} />
            </div>
            <div className="day-night-icon">
              <IsDayOrNightIcon
                isCurrentlyDay={this.state.isCurrentlyDay}
                hasDarkBgClass={isDynamicTextColor}
              />
            </div>
          </div>
          <div className="city-name">
            <CityName
              name={this.state.cityName}
              hasDarkBgClass={isDynamicTextColor}
            />
          </div>
          <div className="temp-hourlyforecast-container">
            <div className="current-temp">
              <CurrentTemp
                temperature={this.state.currentTemp}
                weatherDescription={this.state.weatherDescription}
                hasDarkBgClass={isDynamicTextColor}
                high={this.state.highTemp}
                low={this.state.lowTemp}
              />
            </div>
            <div className="hourly-forecast">
              <HourlyForecast
                allHourlyWeatherArray={this.state.allHourlyWeather}
                hasDarkBgClass={isDynamicForecastBackground}
                currTemp={this.state.currentTemp}
                currentTime={this.state.currentTime}
                sunset={this.state.sunsetTime}
                sunrise={this.state.sunriseTime}
                timezone={this.state.timezone}
              />
            </div>
          </div>
          <div className="daily-forecast">
            <DailyForecast
              allDailyWeatherArray={this.state.allDailyWeather}
              hasDarkBgClass={isDynamicForecastBackground}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherApp;
