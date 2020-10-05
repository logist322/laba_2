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
}