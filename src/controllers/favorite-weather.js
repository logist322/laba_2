import { remove, render } from '../utils/render';

import FavoriteWeatherContainerComponent from '../components/favorite-weather-container';
import FavoriteWeatherGeneralComponent from '../components/favorite-weather-general';
import WeatherDetailsComponent from '../components/weather-details';

export default class FavoriteWeather {
  constructor(container, cityModel, deleteHandler) {
    this._container = container;
    this._cityModel = cityModel;
    this._deleteHandler = deleteHandler;

    this._favoriteWeatherContainerComponent = new FavoriteWeatherContainerComponent();
    this._favoriteWeatherGeneralComponent = new FavoriteWeatherGeneralComponent(this._cityModel);
    this._weatherDetailsComponent =  new WeatherDetailsComponent(this._cityModel);

    this.deleteButtonClickHandler = this.deleteButtonClickHandler.bind(this);
  }

  render() {
    render(this._favoriteWeatherContainerComponent.getElement(), this._favoriteWeatherGeneralComponent);

    render(this._favoriteWeatherContainerComponent.getElement(), this._weatherDetailsComponent);
    this._favoriteWeatherGeneralComponent.setDeleteButtonClickHandler(this.deleteButtonClickHandler);

    render(this._container, this._favoriteWeatherContainerComponent);
  }

  deleteButtonClickHandler() {
    this._removeCity();
    this._deleteHandler(this._cityModel.id);
  }

  _removeCity() {
    remove(this._favoriteWeatherContainerComponent);
    remove(this._favoriteWeatherGeneralComponent);
    remove(this._weatherDetailsComponent);
  }
}