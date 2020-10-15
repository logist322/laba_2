import { render } from "../utils/render";

import LocalHeaderComponent from "../components/local-header";
import LocalWeatherContainerComponent from '../components/local-weather-container';
import LocalWeatherGeneralComponent from '../components/local-weather-general';
import WeatherDetailsComponent from '../components/weather-details';

import CityModel from '../models/city';
import API from "../api";

export default class LocalWeather {
  constructor(container) {
    this._container = container;
    this._cityModel = new CityModel();
    this._api = new API();

    this._localHeaderComponent = new LocalHeaderComponent();
    this._localWeatherContainerComponent = new LocalWeatherContainerComponent();
    this._localWeatherGeneralComponent = new LocalWeatherGeneralComponent(this._cityModel);
    this._weatherDetailsComponent =  new WeatherDetailsComponent(this._cityModel);

    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  render() {
    render(this._container, this._localHeaderComponent);
    this._localHeaderComponent.setClickHandler(this.buttonClickHandler);

    this._api.getDataByGeo()
      .then((data) => {
        this._cityModel.setData(data);
        
        render(this._localWeatherContainerComponent.getElement(), this._localWeatherGeneralComponent);
        render(this._localWeatherContainerComponent.getElement(), this._weatherDetailsComponent);
      });

    render(this._container, this._localWeatherContainerComponent);
  }

  buttonClickHandler() {
    this._localHeaderComponent.setLoadingMode();  

    this._api.getDataByGeo()
      .then((data) => {
        this._cityModel.setData(data);
        
        this._localWeatherGeneralComponent.rerender();
        this._weatherDetailsComponent.rerender();

        this._localHeaderComponent.setDefaultMode();
      })
      .catch((err) => {
        console.log(err);
        
        this._localHeaderComponent.setErrorMode();
        this._localWeatherContainerComponent.shake();
      });    
  }
}