const ENDPOINT = `https://api.openweathermap.org/data/2.5/`;
const TOKKEN = `d136e52c1f0eee76445085fa375a3f40`;

const DEFAULT_COORDS = {
  latitude: 59.9344574,
  longitude: 30.2441396
}

export default class Api {
  constructor() {
    this._localStorage = window.localStorage;
  }

  _getCurrentCoords() {
    return new Promise((resolve) => {
      const geo = navigator.geolocation;

      geo.getCurrentPosition((res) => {
        resolve({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
      }, () => {
        resolve(DEFAULT_COORDS);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });    
  }

  async getDataByGeo() {
    const curCoords = await this._getCurrentCoords().then((res) => res);
    
    return fetch(`${ENDPOINT}weather?lat=${curCoords.latitude}&lon=${curCoords.longitude}&units=metric&appid=${TOKKEN}`)
      .then((res) => {
        return res.json();
      });
  }

  _getIDsFromStorage() {
    const cities = this._getCitiesFromStorage();

    return cities.join(`,`);
  }

  _getCitiesFromStorage() {
    return JSON.parse(this._localStorage.getItem(`favoriteCities`));
  }

  _setCitiesInStorage(arr) {
    this._localStorage.setItem(`favoriteCities`, JSON.stringify(arr));
  }

  _addCityInStorage(id) {
    const cities = this._getCitiesFromStorage();
    cities.push(id)

    this._setCitiesInStorage(cities);
  }

  removeCityFromStorage(id) {
    const cities = this._getCitiesFromStorage();

    this._setCitiesInStorage(cities.filter((city) => city !== id));
  }

  getDataByIDs() {
    const ids = this._getIDsFromStorage();
    
    return fetch(`${ENDPOINT}group?id=${ids}&units=metric&appid=${TOKKEN}`)
      .then((res) => {
        return res.json();
      });
  }

  getDataByName(cityName) {
    let isOK = false; 

    return fetch(`${ENDPOINT}weather?q=${cityName.trim()}&units=metric&appid=${TOKKEN}`)
      .then((res) => {
        if (res.ok) {
          isOK = true;
          
          return res.json();
        }

        throw new Error(`Не удалось найти город "${cityName}". Попробуйте снова.`);
      }).then((res) => {
        if (isOK) {
          this._addCityInStorage(res.id);
        }        

        return res;
      });
  }

  isStorageEmpty() {
    if (!this._getCitiesFromStorage()) {
      this._setCitiesInStorage([]);

      return true;
    }

    if (!this._getCitiesFromStorage().length) {
      return true;
    }

    return false;
  }
}