import AbstractComponent from './abstract-component';

const createRefreshButtonTemplate = () => {
  return (
    `<button class="refresh__button" type="button"><span class="refresh__button-text">Обновить геолокацию</span></button>`
  );
}

export default class RefreshButton extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createRefreshButtonTemplate();
  }

  setClickHandler(cb) {
  }
}