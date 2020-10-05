import AbstractComponent from './abstract-component';

const createLocalHeaderTemplate = () => {
  return (
    `<div class="local__refresh refresh">
      <h2 class="refresh__heading">Погода здесь</h2>
      <button class="refresh__button" type="button"><span class="refresh__button-text">Обновить геолокацию</span></button>
    </div>`
  );
}

export default class LocalHeader extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createLocalHeaderTemplate();
  }

  setClickHandler(cb) {
    this._element.querySelector(`.refresh__button`).addEventListener(`click`, () => {
      cb();
    });
  }
}