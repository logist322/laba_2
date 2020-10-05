import LocalWeatherController from './controllers/local-weather';
import FavoritesBoardController from './controllers/favorites-board';


const localWeatherContainerElement = document.querySelector(`.local`);
const favoritesContainerElement = document.querySelector(`.favorites`);

const localWeatherController = new LocalWeatherController(localWeatherContainerElement);
const favoritesBoardController = new FavoritesBoardController(favoritesContainerElement);

localWeatherController.render();
favoritesBoardController.render();
