import { InfoToast, ErrorToast } from "./util/util.js";

const API_KEY = "384f5f36aa137ad1e88da99c56ace135";
const LOCATION = "Pittsburgh";
const UNITS = "imperial";

function getUnitSymbol() {
  return "°F";
}

function getWeatherData(callback, type = "forecast") {
  const requestUrl = `https://api.openweathermap.org/data/2.5/${type}?q=${encodeURIComponent(LOCATION)}&appid=${API_KEY}&units=${UNITS}`;

  $.getJSON({
    url: requestUrl,
    error: (err) => {
      new ErrorToast("Could not fetch data", err?.responseJSON?.message || err?.status || err || "unknown error");
    },
    success: (result) => {
      callback(type === "forecast" ? result.list : result);
    },
  });
}

function makePreviewHTML(day_raw) {
  if (!day_raw || typeof day_raw !== "object" || !(day_raw.main && day_raw.weather && day_raw.dt)) {
    return;
  }

  const options = {
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    hour12: true,
  };

  let day = {
    date: new Date(day_raw.dt * 1000).toLocaleString("en-US", options).split(", ").reverse().join(" "),
    temp: Math.round(day_raw.main.temp),
    feels_like: day_raw.main.feels_like,
    high: day_raw.main.temp_max,
    low: day_raw.main.temp_min,
    icon: day_raw.weather[0].icon + ".png",
    desc: day_raw.weather[0].description,
    main: day_raw.weather[0].main,
  };

  return $(`
    <div class="forecast_card" weather=${day.main.toLowerCase().replace(" ", "")}>
      <img class="forecast_card__icon" alt="${day.desc}" src="../static/images/weather/${day.icon}" />
      <div class="forecast_card_text">${day.date}
        <p class="forecast_card__temp">${day.temp}${getUnitSymbol()}</p>
      </div>
    </div>
    `).click(() => {
    new InfoToast(`Feels like ${day.feels_like}${getUnitSymbol()} with a high of ${day.high}${getUnitSymbol()} and low of ${day.low}${getUnitSymbol()}`, 4000);
  });
}

function getWeatherHTML() {
  return new Promise((resolve) => {
    const weatherContainer = $('<div class="weather-container"></div>');
    const forecastRow = $('<div id="forecast_card_row" class="forecast_card_row"></div>');
    const currentDisplay = $(`
      <div class="current-weather">
        <h2>Duquesne Incline Region</h2>
        <div class="current-weather-display">
          <img id="current_icon" src="" alt="Weather icon" />
          <div id="current_text">
            <span id="current_temp"></span>${getUnitSymbol()}
            <div class="min-max">
              <span id="current_min_temp"></span>${getUnitSymbol()} / 
              <span id="current_max_temp"></span>${getUnitSymbol()}
            </div>
          </div>
        </div>
      </div>
    `);

    weatherContainer.append(currentDisplay);
    weatherContainer.append(forecastRow);

    getWeatherData((forecast) => {
      forecast.forEach((day) => {
        forecastRow.append(makePreviewHTML(day));
      });
      const weatherImgPath = "../static/images/weather/";
      getWeatherData((current) => {
        $(document.body).toggleClass("dark", current.weather[0].icon.includes("n"));
        $("#current_temp", weatherContainer).text(current.main.temp);
        $("#current_min_temp", weatherContainer).text(current.main.temp_min);
        $("#current_max_temp", weatherContainer).text(current.main.temp_max);
        $("#current_icon", weatherContainer).attr("src", weatherImgPath + current.weather[0].icon + ".png");

        resolve(weatherContainer);
      }, "weather");
    });

    forecastRow.on("wheel", (e) => {
      // check that x scroll component is not greater than y scroll component
      if (Math.abs(e.originalEvent.deltaX) < Math.abs(e.originalEvent.deltaY)) {
        e.preventDefault();
        forecastRow.scrollLeft(forecastRow.scrollLeft() + e.originalEvent.deltaY);
      }
    });
  });
}

export { getWeatherHTML };
