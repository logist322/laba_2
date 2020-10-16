import AbstractComponent from './abstract-component';

const createFavoriteWeatherGeneralTemplate = ({name, icon, description, temp}) => {
  return (
    `<div class="favorite-item__general">
      <h3 class="favorite-item__city">${name}</h3>
      <p class="favorite-item__short-info">
        <span class="favorite-item__degrees">${temp}&deg;C</span>
        <img class="favorite-item__icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="30" height="30">
      </p>
      <button class="favorite-item__button"><span class="visually-hidden">Удалить город</span></button>
    </div>`
  );
}

export default class FavoriteWeatherGeneral extends AbstractComponent {
  constructor(city) {
    super();

    this._city = city;
  }

  getTemplate() {
    return createFavoriteWeatherGeneralTemplate(this._city);
  }

  setDeleteButtonClickHandler(cd) {
    this._element.querySelector(`.favorite-item__button`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      cd();
    });
  }
}