import {render} from './utils/render';
import RefreshButtonComponent from './components/refresh-button';
import LocalWeatherController from './controllers/local-weather';
import CityModel from './models/city';

import data from './mock/data';

const refreshContainerElement = document.querySelector(`.refresh`);
const localWeatherContainerElement = document.querySelector(`.local-weather`);

const cityModel = new CityModel(data);

const localWeatherController = new LocalWeatherController(localWeatherContainerElement, cityModel);

render(refreshContainerElement, new RefreshButtonComponent());
localWeatherController.render();
