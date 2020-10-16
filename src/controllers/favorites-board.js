import { render } from '../utils/render';

import CitiesModel from '../models/cities';

import FavoriteWeatherController from '../controllers/favorite-weather';

import FavoritesHeaderComponent from '../components/favorites-header';
import FavoritesBoardComponent from '../components/favorites-board';
import { createElement } from '../utils/common';
import AutocompleteComponent from '../components/autocomplete';

export default class FavoritesBoard {
  constructor(container, api) {
    this._container = container;
    this._api = api;
    
    this._citiesModel = new CitiesModel();

    this._favoritesHeaderComponent = new FavoritesHeaderComponent();
    this._favoritesBoardComponent = new FavoritesBoardComponent();

    this._autocomplete = new AutocompleteComponent();

    this.deleteCityHandler = this.deleteCityHandler.bind(this);
    this.findCity = this.findCity.bind(this);
  }

  render() {
    const container = this._container;

    render(container, this._favoritesHeaderComponent);
    this._favoritesHeaderComponent.setInputHandler(this.findCity);
    this._favoritesHeaderComponent.setAddHandler();

    this._favoritesHeaderComponent.getElement().appendChild(this._autocomplete.getElement());

    render(container, this._favoritesBoardComponent);

    this._refreshBoard();
  }

  findCity() {
    this._autocomplete.show();
  }

  _refreshBoard() {
    if (this._api.isStorageEmpty()) {
      this._favoritesBoardComponent.getElement().innerHTML = `<b>Добавьте город</b>`;

      return;
    } 

    this._favoritesBoardComponent.getElement().innerHTML = `<b>Загрузка...</b>`;
    this._api.getDataByIDs()
      .then((res) => {
        this._favoritesBoardComponent.getElement().innerHTML = ``;
        this._citiesModel.setCities(res);

        
        
        this._renderCities(this._favoritesBoardComponent.getElement());
      })
      .catch((e) => {
        console.error(e);
        this._favoritesBoardComponent.getElement().innerHTML = `<b>Ошибка загрузки</b>`;
      });
  }

  _renderCities(container) {
    this._citiesModel.getCities().forEach((cityModel) => {
      const cityCard = new FavoriteWeatherController(container, cityModel, this.deleteCityHandler);
      cityCard.render();
    })
  }

  deleteCityHandler(id) {
    this._api.removeCityFromStorage(id);
    this._refreshBoard();
  }
}