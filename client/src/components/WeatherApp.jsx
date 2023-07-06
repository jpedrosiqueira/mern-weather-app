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
import { ErrorMessage } from "./ErrorMessage";

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
      displayErrorMsg: false,
    };
  }

  // Based on Searchbar input, fetch data from our API
  fetchWeatherData = async (searchbarInput) => {
    const body = { cityName: searchbarInput, unit: this.state.unit };

    await axios.post("/.netlify/functions/searchLocation", body).then((res) => {
      // We only need city name, high temperature and low from
      // the currentWeather data fetched
      const currentWeatherData = res.data.currentWeatherData;

      this.setState({
        cityName: currentWeatherData.name,
        highTemp: currentWeatherData.main.temp_max,
        lowTemp: currentWeatherData.main.temp_min,
        forecastData: res.data.forecastData,
        displayErrorMsg: false,
      });
    });
  };

  // On submit, fetch our data based on the input.
  handleSubmit = (searchbarInput) => {
    this.fetchWeatherData(searchbarInput)
      .then(() => {
        const forecastData = this.state.forecastData;
        this.setState(
          {
            currentTemp: forecastData.current.temp,
            weatherDescription: forecastData.current.weather[0].main,
            allHourlyWeather: forecastData.hourly,
            allDailyWeather: forecastData.daily,
            sunriseTime: forecastData.current.sunrise,
            sunsetTime: forecastData.current.sunset,
            currentTime: forecastData.current.dt,
            timezone: forecastData.timezone,
          },
          () => {
            // After some information from state has been set,
            // set more information based on those.
            this.setState(
              {
                inputField: searchbarInput,
                isCurrentlyDay: isDay(
                  this.state.currentTime,
                  this.state.sunsetTime,
                  this.state.sunriseTime
                ),
              },
              () => {
                this.setState({
                  background: findBackgroundImg(
                    this.state.weatherDescription.toLowerCase(),
                    this.state.isCurrentlyDay
                  ),
                });
              }
            );
          }
        );
      })
      .catch(() => {
        this.setState({
          displayErrorMsg: true,
        });
      });
  };

  // Fetch from API when the temperature unit changes
  fetchNewTemperatures = () => {
    // First, encode city name in case it includes special characters
    const cityNameEncoded = encodeURIComponent(this.state.cityName);
    this.state.cityName !== "Winterfell" &&
      this.fetchWeatherData(cityNameEncoded).then(() => {
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
    const {
      background,
      isCurrentlyDay,
      cityName,
      currentTemp,
      weatherDescription,
      highTemp,
      lowTemp,
      allHourlyWeather,
      currentTime,
      sunsetTime,
      sunriseTime,
      timezone,
      allDailyWeather,
      displayErrorMsg,
    } = this.state;

    const isDynamicForecastBackground = isDarkForecastBg(background);
    const isDynamicTextColor = isDarkTextColorBg(background);

    // Set the app background based on the current weather
    let backgroundStyle = {
      backgroundImage: `url(${background}`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    };
    return (
      <div style={backgroundStyle}>
        <div className="container">
          <div className="header-container">
            <SearchBar className="search-bar" onSubmit={this.handleSubmit} />
            <ErrorMessage
              className="error-message-container"
              displayMsg={displayErrorMsg}
            />
            <ToggleUnit
              className="toggle-button-container"
              changeUnit={this.handleChangeUnit}
            />
            <IsDayOrNightIcon
              className="day-night-icon"
              isCurrentlyDay={isCurrentlyDay}
              hasDarkBgClass={isDynamicTextColor}
            />
          </div>
          <CityName
            className="city-name"
            name={cityName}
            hasDarkBgClass={isDynamicTextColor}
          />
          <div className="temp-hourlyforecast-container">
            <CurrentTemp
              className="current-temp"
              temperature={currentTemp}
              weatherDescription={weatherDescription}
              hasDarkBgClass={isDynamicTextColor}
              high={highTemp}
              low={lowTemp}
            />
            <HourlyForecast
              className="hourly-forecast"
              allHourlyWeatherArray={allHourlyWeather}
              weatherDescription={weatherDescription}
              hasDarkBgClass={isDynamicForecastBackground}
              currTemp={currentTemp}
              currentTime={currentTime}
              sunset={sunsetTime}
              sunrise={sunriseTime}
              timezone={timezone}
            />
          </div>
          <DailyForecast
            className="daily-forecast"
            allDailyWeatherArray={allDailyWeather}
            hasDarkBgClass={isDynamicForecastBackground}
          />
        </div>
      </div>
    );
  }
}

export default WeatherApp;
