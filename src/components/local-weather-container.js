import AbstractComponent from './abstract-component';

const createLocalWeatherContainerTemplate = () => {
  return (
    `<div class="local__info local-weather">

    </div>`
  );
}

export default class LocalWeatherContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLocalWeatherContainerTemplate();
  }

  shake() {
    this._element.classList.add(`local-weather--error`);
    setTimeout(() => {this._element.classList.remove(`local-weather--error`)}, 500);
  }
}