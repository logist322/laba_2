import {render} from './utils/render';
import RefreshButtonComponent from './components/refresh-button';

const refreshContainerElement = document.querySelector(`.refresh`);
const localWeatherContainerElement = document.querySelector(`.local-weather`);

render(refreshContainerElement, new RefreshButtonComponent());