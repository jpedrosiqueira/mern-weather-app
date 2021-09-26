# Weather App

A dynamic weather app that displays current weather information, as well as hourly and daily forecast.

## Description

This project was created by Pedro Siqueira, as an assignment for Palmetto Solar.

### Features

- Changes app background dynamically, based on current location weather.
- Displays current weather temperature, description, high and low.
- Displays forecast for the next six hours, considering that location timezone, as well as weather description icon, and temperature for that specific time.
- Displays forecast for the next six days, showing the weekday, weather description icon for that day, as well as high and low temperatures.
- Icon that indicates if it is currently day or night, located on the top right of the page.
- Button that toggles units between Fahrenheit(default) and Celsius.

## How to run the app

1. On root of project, enter client folder with `cd client`, and run `npm install`
2. Exit client folder with `cd ..`, and run `npm install` on root folder.
3. Run on command line `npm run dev`
4. Have fun checking the weather!

Testing: to run tests, run `npm test` inside client folder.

**Note:** If there's an issue with babel-jest when running `npm run dev`, then you should create a `.env` file inside `/client` folder and add `SKIP_PREFLIGHT_CHECK=true`. Save the file and try running again.

### Figma Design

This project design was sketched using Figma.<br>
[Link to Figma file](https://www.figma.com/file/Lxukrvy2KmXP6AjWVDbFgF/WeatherApp?node-id=635%3A489)

### Screenshots

On Desktop: <br>
![Desktop](/client/src/assets/screenshots/desktop-screenshot.png?raw=true)

On Mobile: <br>
![Mobile](/client/src/assets/screenshots/mobile-screenshot.png?raw=true)
