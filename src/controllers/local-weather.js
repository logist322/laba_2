import { render } from "../utils/render";

import LocalWeatherGeneralComponent from '../components/local-weather-general';
import WeatherDetailsComponent from '../components/weather-details';

export default class LocalWeather {
  constructor(container, cityModel) {
    this._container = container;
    this._cityModel = cityModel;
  }

  render() {
    const container = this._container;

    render(container, new LocalWeatherGeneralComponent(this._cityModel));
    render(container, new WeatherDetailsComponent(this._cityModel));
  }
}