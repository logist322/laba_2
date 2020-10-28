import CityModel from './city.js'

export default class CitiesModel {
  constructor() {
    this._cities = [];
  }

  addCity(data) {
    const cityModel = new CityModel();
    cityModel.setData(data);

    this._cities.push(cityModel);

    return cityModel;
  }

  setCities(data) {
    this._cities = data.list.map((city) => {
      const cityModel = new CityModel();
      cityModel.setData(city);

      return cityModel;
    });  
  }

  getCities() {
    return this._cities;
  }
}