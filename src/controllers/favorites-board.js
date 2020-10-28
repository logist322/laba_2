import { createElement } from '../utils/common';
import { render } from '../utils/render';

import CitiesModel from '../models/cities';

import FavoriteWeatherController from '../controllers/favorite-weather';

import FavoritesHeaderComponent from '../components/favorites-header';
import FavoritesBoardComponent from '../components/favorites-board';

export default class FavoritesBoard {
  constructor(container, api) {
    this._container = container;
    this._api = api;
    
    this._citiesModel = new CitiesModel();

    this._favoritesHeaderComponent = new FavoritesHeaderComponent();
    this._favoritesBoardComponent = new FavoritesBoardComponent();

    this.deleteCityHandler = this.deleteCityHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
  }

  render() {
    const container = this._container;

    render(container, this._favoritesHeaderComponent);
    this._favoritesHeaderComponent.setAddHandler(this.addHandler);

    render(container, this._favoritesBoardComponent);

    this._renderBoard();
  }

  addHandler(cityName) {
    this._favoritesHeaderComponent.setLoadingMode();

    if (this._favoritesBoardComponent.getElement().lastChild.tagName === `B`) {
      this._favoritesBoardComponent.getElement().lastChild.remove();
    }

    this._favoritesBoardComponent.getElement().appendChild(createElement(`<b>Загрузка...</b>`));

    this._api.getDataByName(cityName)
      .then((data) => {
        this._favoritesBoardComponent.getElement().lastChild.remove();

        const cityCard = new FavoriteWeatherController(this._favoritesBoardComponent.getElement(), this._citiesModel.addCity(data), this.deleteCityHandler);
        cityCard.render();
        
        this._favoritesHeaderComponent.setDefaultMode();
      }).catch((err) => {
        console.error(err);
        
        this._favoritesBoardComponent.getElement().lastChild.remove();
        this._favoritesBoardComponent.getElement().appendChild(createElement(`<b>${err.message}</b>`));

        this._favoritesHeaderComponent.setDefaultMode();
      })      
  }

  _renderBoard() {
    if (this._api.isStorageEmpty()) {
      this._favoritesBoardComponent.getElement().innerHTML = `<b>Список пока пуст :(</b>`;

      return;
    } 

    this._favoritesBoardComponent.getElement().innerHTML = `<b>Загрузка...</b>`;
    this._api.getDataByIDs()
      .then((res) => {
        this._favoritesBoardComponent.getElement().innerHTML = ``;
        this._citiesModel.setCities(res);
        
        this._renderCities(this._favoritesBoardComponent.getElement());
      })
      .catch((err) => {
        console.error(err);
        this._favoritesBoardComponent.getElement().innerHTML = `<b>Ошибка загрузки</b>`;
      });
  }

  _renderCities() {
    this._citiesModel.getCities().forEach((cityModel) => {
      const cityCard = new FavoriteWeatherController(this._favoritesBoardComponent.getElement(), cityModel, this.deleteCityHandler);
      cityCard.render();
    })
  }

  deleteCityHandler(id) {
    this._api.removeCityFromStorage(id);

    if (this._api.isStorageEmpty()) {
      this._favoritesBoardComponent.getElement().innerHTML = `<b>Список пока пуст :(</b>`;
    } 
  }
}