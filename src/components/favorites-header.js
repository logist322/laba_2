import AbstractComponent from './abstract-component';

const createFavoritesHeaderTemplate = () => {
  return (
    `<div class="favorites__header">
      <h2 class="favorites__heading">Избранное</h2>
      <form class="favorites__add">
        <input type="text" class="favorites__input" placeholder="Добавить новый город">
        <button class="favorites__add-button" type="submit"><span class="visually-hidden">Добавить новый город</span></button>
      </form>
    </div>`
  );
}

export default class FavoritesHeader extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createFavoritesHeaderTemplate();
  }

  setAddHandler(cb) {
    const inputElement = this._element.querySelector(`.favorites__input`);
    const addButtonElement = this._element.querySelector(`.favorites__add-button`);

    addButtonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      cb(inputElement.value);
      inputElement.value = ``;
    })
  }

  setDefaultMode() {
    this._element.querySelector(`.favorites__add-button`).disabled = false;
    this._element.querySelector(`.favorites__input`).disabled = false;
  }

  setLoadingMode() {
    this._element.querySelector(`.favorites__add-button`).disabled = true;
    this._element.querySelector(`.favorites__input`).disabled = true;
  }
}