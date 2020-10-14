const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?`;
const TOKKEN = `2d8420f5edb545e419bf06deee1dd59d`;
const DEFAULT_COORDS = {
  latitude: 59.9344574,
  longitude: 30.2441396
}

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
};

export default class Api {
  _getCurrentCoords() {
    return new Promise((resolve, reject) => {
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
    
    return fetch(`${ENDPOINT}lat=${curCoords.latitude}&lon=${curCoords.longitude}&units=metric&appid=${TOKKEN}`)
      .then((res) => {
        return res.json();
      });
  }
}