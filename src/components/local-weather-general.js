import AbstractSmartComponent from './abstract-smart-component';

const createLocalWeatherGeneralTemplate = ({name, icon, description, temp}) => {
  return (
    `<div class="local-weather__general">
      <h3 class="local-weather__city">${name}</h3>
      <p class="local-weather__short-info">
        <span class="local-weather__icon-wrap">
          <img class="local-weather__icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="75" height="75">
        </span>
        <span class="local-weather__degrees">${temp}&deg;C</span>
      </p>
    </div>`
  );
}

export default class LocalWeatherGeneral extends AbstractSmartComponent {
  constructor(city) {
    super();

    this._city = city;
  }

  recoveryListeners() {
  };

  getTemplate() {
    return createLocalWeatherGeneralTemplate(this._city);
  }
}