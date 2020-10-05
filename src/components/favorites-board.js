import AbstractComponent from './abstract-component';

const createFavoritesBoardTemplate = () => {
  return (
    `<ul class="favorites__list list-style-reset">
      <li class="favorites__item favorite-item">
        <div class="favorite-item__general">
          <h3 class="favorite-item__city">Moscow</h3>
          <p class="favorite-item__short-info">
            <span class="favorite-item__degrees">5&deg;C</span>
            <img class="favorite-item__icon" src="img/cloud.svg" alt="Пасмурная погода" width="30" height="30">
          </p>
          <button class="favorite-item__button"><span class="visually-hidden">Удалить город</span></button>
        </div>

        <ul class="favorite-item__details weather-details list-style-reset">
          <li class="weather-details__item">
            <span class="weather-details__property">Ветер</span>
            <span class="weather-details__value">Moderate breeze, 6.0 m/s, North-northwest</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Облачность</span>
            <span class="weather-details__value">Broken clouds</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Давление</span>
            <span class="weather-details__value">1013 hpa</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Влажность</span>
            <span class="weather-details__value">52 %</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Координаты</span>
            <span class="weather-details__value">[59.88, 30.42]</span>
          </li>
        </ul>
      </li>    
    </ul>`
  );
}

export default class FavoritesBoard extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createFavoritesBoardTemplate();
  }
}