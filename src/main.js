import LocalWeatherController from './controllers/local-weather';
import FavoritesBoardController from './controllers/favorites-board';
import API from './api';

const localWeatherContainerElement = document.querySelector(`.local`);
const favoritesContainerElement = document.querySelector(`.favorites`);

const api = new API();

const localWeatherController = new LocalWeatherController(localWeatherContainerElement, api);
const favoritesBoardController = new FavoritesBoardController(favoritesContainerElement, api);

localWeatherController.render();
favoritesBoardController.render();
