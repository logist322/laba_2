import AbstractComponent from './abstract-component';

const createLocalHeaderTemplate = () => {
  return (
    `<div class="local__refresh refresh">
      <h2 class="refresh__heading">Погода здесь</h2>
      <button class="refresh__button refresh__button-text" type="button">Обновить геолокацию</button>
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
  
  setDefaultMode() {
    const button = this._element.querySelector(`.refresh__button`);
    button.textContent = `Обновить геолокацию`;
    button.disabled = false;
    button.classList.remove(`refresh__button--loading`);
    button.classList.remove(`refresh__button--error`);
  }

  setLoadingMode() {
    const button = this._element.querySelector(`.refresh__button`);
    button.textContent = `Обновление...`;
    button.disabled = true;
    button.classList.add(`refresh__button--loading`);
    button.classList.remove(`refresh__button--error`);
  }

  setErrorMode() {
    const button = this._element.querySelector(`.refresh__button`);
    button.textContent = `Попробовать снова`;
    button.disabled = false;
    button.classList.add(`refresh__button--error`);
    button.classList.remove(`refresh__button--loading`);
  }
}