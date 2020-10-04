import AbstractComponent from './abstract-component';

const createLocalSectionTemplate = () => {
  return (
    `<button class="refresh__button" type="button"><span class="refresh__button-text">Обновить геолокацию</span></button>`
  );
}

export default class RefreshButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLocalSectionTemplate();
  }

  setClickHandler(cb) {
  }
}