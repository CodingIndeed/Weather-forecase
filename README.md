
# Weather Forecast Application

This is a simple weather forecast web application built with **React** that provides current weather information and a 5-day forecast. It also includes a light/dark mode toggle and displays additional information about the PM Accelerator.

## Features
- Search for a city to get the current weather and a 5-day forecast.
- Geolocation support to fetch weather data for the user's current location.
- Toggle between **light mode** and **dark mode**.
- Info button providing details about the PM Accelerator.
- Responsive design with a toggle switch for dark mode and user-friendly interface.

## How to Run the Project

### Prerequisites
- **Node.js** (Version 14.x or later)
- **npm** (or **yarn**)

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**:

   If you're using npm:

   ```bash
   npm install
   ```

   If you're using yarn:

   ```bash
   yarn install
   ```

3. **Set up the environment**:

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Add your OpenWeatherMap API key to the `.env` file:

   ```env
   REACT_APP_WEATHER_API_KEY='API KEY'
   ```

   You can obtain an API key from the OpenWeatherMap API.

4. **Run the application**:

   If you're using npm:

   ```bash
   npm start
   ```

   If you're using yarn:

   ```bash
   yarn start
   ```

   The application will start at `http://localhost:3000`.

## Environment Variables
The application requires an API key from the OpenWeatherMap API. To use this, you need to create a `.env` file in the root directory and add the following:

```makefile
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
```

An example `.env` file is provided as `.env.example`. Simply copy it and replace `API KEY` with the actual key from OpenWeatherMap.

## How it Works
- **Search Bar**: Enter a city name to fetch the weather information and the 5-day forecast.
- **Geolocation**: Click on the "Get Weather for My Location" button to fetch weather information for your current location.
- **Toggle Switch**: Use the toggle switch to switch between light and dark modes.
- **Info Button**: Click on the "Info" button to display additional information about PM Accelerator.

## Project Structure
```bash
├── public
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.js               # Main React component
│   ├── App.css              # Stylesheet for the application
│   ├── index.js             # Entry point for the React application
│   ├── index.css            # Global styles
│   └── components           # Reusable components
│       └── ForecastItem.js
├── .env.example             # Environment file example
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked dependencies versions
└── README.md                # Project documentation
```

## License
This project is licensed under the MIT License.
