import AbstractSmartComponent from './abstract-smart-component';

const createWeatherDetailsTemplate = ({wind, clouds, pressure, humidity, coordinates}) => {
  return (
    `<ul class="local-weather__details weather-details list-style-reset">
      <li class="weather-details__item">
        <span class="weather-details__property">Ветер</span>
        <span class="weather-details__value">${wind.speed} m/s, ${wind.direction}</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Облачность</span>
        <span class="weather-details__value">${clouds} %</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Давление</span>
        <span class="weather-details__value">${pressure} hpa</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Влажность</span>
        <span class="weather-details__value">${humidity} %</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Координаты</span>
        <span class="weather-details__value">[${coordinates.latitude}, ${coordinates.longitude}]</span>
      </li>
    </ul>`
  );
}

export default class WeatherDetails extends AbstractSmartComponent {
  constructor(city) {
    super();

    this._city = city;
  }

  recoveryListeners() {
  };

  getTemplate() {
    return createWeatherDetailsTemplate(this._city);
  }
}