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

    this._value = null;
  }

  getTemplate() {
    return createFavoritesHeaderTemplate();
  }

  setAddHandler(cb) {
    this._element.querySelector(`.favorites__add-button`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      
      if (!this._value) {
        return;
      }

      cb(this._value);
    });
  }

  setInputHandler(cb) {
    this._element.querySelector(`.favorites__input`).addEventListener(`input`, (evt) => {
      this._value = null;
      cb(evt.target.value);
    })
  }
}