/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
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

class Api {
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

/***/ }),

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


const HIDDEN_CLASS = `visually-hidden`;

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS);
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/abstract-smart-component.js":
/*!****************************************************!*\
  !*** ./src/components/abstract-smart-component.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractSmartComponent; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


class AbstractSmartComponent extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}


/***/ }),

/***/ "./src/components/favorites-board.js":
/*!*******************************************!*\
  !*** ./src/components/favorites-board.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FavoritesBoard; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createFavoritesBoardTemplate = () => {
  return (
    `<ul class="favorites__list list-style-reset">
      <li class="favorites__item favorite-item">
        <div class="favorite-item__general">
          <h3 class="favorite-item__city">Moscow</h3>
          <p class="favorite-item__short-info">
            <span class="favorite-item__degrees">5&deg;C</span>
            <img class="favorite-item__icon" src="img/cloud.svg" alt="Пасмурная погода" width="30" height="30">
          </p>
          <button class="favorite-item__button"><span class="visually-hidden">Удалить город</span></button>
        </div>

        <ul class="favorite-item__details weather-details list-style-reset">
          <li class="weather-details__item">
            <span class="weather-details__property">Ветер</span>
            <span class="weather-details__value">Moderate breeze, 6.0 m/s, North-northwest</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Облачность</span>
            <span class="weather-details__value">Broken clouds</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Давление</span>
            <span class="weather-details__value">1013 hpa</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Влажность</span>
            <span class="weather-details__value">52 %</span>
          </li>

          <li class="weather-details__item">
            <span class="weather-details__property">Координаты</span>
            <span class="weather-details__value">[59.88, 30.42]</span>
          </li>
        </ul>
      </li>    
    </ul>`
  );
}

class FavoritesBoard extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createFavoritesBoardTemplate();
  }
}

/***/ }),

/***/ "./src/components/local-header.js":
/*!****************************************!*\
  !*** ./src/components/local-header.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalHeader; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createLocalHeaderTemplate = () => {
  return (
    `<div class="local__refresh refresh">
      <h2 class="refresh__heading">Погода здесь</h2>
      <button class="refresh__button refresh__button-text" type="button">Обновить геолокацию</button>
    </div>`
  );
}

class LocalHeader extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createLocalHeaderTemplate();
  }

  setClickHandler(cb) {
    this._element.querySelector(`.refresh__button`).addEventListener(`click`, () => {
      cb();
    });
  }
  
  setDefaultMode() {
    const button = this._element.querySelector(`.refresh__button`);
    button.textContent = `Обновить геолокацию`;
    button.disabled = false;
    button.classList.remove(`refresh__button--loading`);
    button.classList.remove(`refresh__button--error`);
  }

  setLoadingMode() {
    const button = this._element.querySelector(`.refresh__button`);
    button.textContent = `Обновление...`;
    button.disabled = true;
    button.classList.add(`refresh__button--loading`);
    button.classList.remove(`refresh__button--error`);
  }

  setErrorMode() {
    const button = this._element.querySelector(`.refresh__button`);
    button.textContent = `Попробовать снова`;
    button.disabled = false;
    button.classList.add(`refresh__button--error`);
    button.classList.remove(`refresh__button--loading`);
  }
}

/***/ }),

/***/ "./src/components/local-weather-container.js":
/*!***************************************************!*\
  !*** ./src/components/local-weather-container.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalWeatherContainer; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createLocalWeatherContainerTemplate = () => {
  return (
    `<div class="local__info local-weather">

    </div>`
  );
}

class LocalWeatherContainer extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }

  getTemplate() {
    return createLocalWeatherContainerTemplate();
  }
}

/***/ }),

/***/ "./src/components/local-weather-general.js":
/*!*************************************************!*\
  !*** ./src/components/local-weather-general.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalWeatherGeneral; });
/* harmony import */ var _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-smart-component */ "./src/components/abstract-smart-component.js");


const createLocalWeatherGeneralTemplate = ({name, icon, description, temp}) => {
  return (
    `<div class="local-weather__general">
      <h3 class="local-weather__city">${name}</h3>
      <p class="local-weather__short-info">
        <span class="local-weather__icon-wrap">
          <img class="local-weather__icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="75" height="75">
        </span>
        <span class="local-weather__degrees">${temp}&deg;C</span>
      </p>
    </div>`
  );
}

class LocalWeatherGeneral extends _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(city) {
    super();

    this._city = city;
  }

  recoveryListeners() {
  };

  getTemplate() {
    return createLocalWeatherGeneralTemplate(this._city);
  }
}

/***/ }),

/***/ "./src/components/weather-details.js":
/*!*******************************************!*\
  !*** ./src/components/weather-details.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WeatherDetails; });
/* harmony import */ var _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-smart-component */ "./src/components/abstract-smart-component.js");


const createWeatherDetailsTemplate = ({wind, clouds, pressure, humidity, coordinates}) => {
  return (
    `<ul class="local-weather__details weather-details list-style-reset">
      <li class="weather-details__item">
        <span class="weather-details__property">Ветер</span>
        <span class="weather-details__value">${wind.speed} m/s, ${wind.direction}</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Облачность</span>
        <span class="weather-details__value">${clouds} %</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Давление</span>
        <span class="weather-details__value">${pressure} hpa</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Влажность</span>
        <span class="weather-details__value">${humidity} %</span>
      </li>

      <li class="weather-details__item">
        <span class="weather-details__property">Координаты</span>
        <span class="weather-details__value">[${coordinates.latitude}, ${coordinates.longitude}]</span>
      </li>
    </ul>`
  );
}

class WeatherDetails extends _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(city) {
    super();

    this._city = city;
  }

  recoveryListeners() {
  };

  getTemplate() {
    return createWeatherDetailsTemplate(this._city);
  }
}

/***/ }),

/***/ "./src/controllers/favorites-board.js":
/*!********************************************!*\
  !*** ./src/controllers/favorites-board.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FavoritesBoard; });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _components_favorites_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/favorites-board */ "./src/components/favorites-board.js");




class FavoritesBoard {
  constructor(container) {
    this._container = container;
  }

  render() {
    const container = this._container;

    Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["render"])(container, new _components_favorites_board__WEBPACK_IMPORTED_MODULE_1__["default"]());
  }
}

/***/ }),

/***/ "./src/controllers/local-weather.js":
/*!******************************************!*\
  !*** ./src/controllers/local-weather.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalWeather; });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _components_local_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/local-header */ "./src/components/local-header.js");
/* harmony import */ var _components_local_weather_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/local-weather-container */ "./src/components/local-weather-container.js");
/* harmony import */ var _components_local_weather_general__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/local-weather-general */ "./src/components/local-weather-general.js");
/* harmony import */ var _components_weather_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/weather-details */ "./src/components/weather-details.js");
/* harmony import */ var _models_city__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/city */ "./src/models/city.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api */ "./src/api/index.js");










class LocalWeather {
  constructor(container) {
    this._container = container;
    this._cityModel = new _models_city__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this._api = new _api__WEBPACK_IMPORTED_MODULE_6__["default"]();

    this._localHeaderComponent = new _components_local_header__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this._localWeatherContainerComponent = new _components_local_weather_container__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._localWeatherGeneralComponent = new _components_local_weather_general__WEBPACK_IMPORTED_MODULE_3__["default"](this._cityModel);
    this._weatherDetailsComponent =  new _components_weather_details__WEBPACK_IMPORTED_MODULE_4__["default"](this._cityModel);

    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  render() {
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["render"])(this._container, this._localHeaderComponent);
    this._localHeaderComponent.setClickHandler(this.buttonClickHandler);

    this._api.getDataByGeo()
      .then((data) => {
        this._cityModel.setData(data);
        
        Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["render"])(this._localWeatherContainerComponent.getElement(), this._localWeatherGeneralComponent);
        Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["render"])(this._localWeatherContainerComponent.getElement(), this._weatherDetailsComponent);
      });

    Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["render"])(this._container, this._localWeatherContainerComponent);
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
      .catch(() => {
        this._localHeaderComponent.setErrorMode();
      });    
  }
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_local_weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/local-weather */ "./src/controllers/local-weather.js");
/* harmony import */ var _controllers_favorites_board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/favorites-board */ "./src/controllers/favorites-board.js");



const localWeatherContainerElement = document.querySelector(`.local`);
const favoritesContainerElement = document.querySelector(`.favorites`);

const localWeatherController = new _controllers_local_weather__WEBPACK_IMPORTED_MODULE_0__["default"](localWeatherContainerElement);
const favoritesBoardController = new _controllers_favorites_board__WEBPACK_IMPORTED_MODULE_1__["default"](favoritesContainerElement);

localWeatherController.render();
favoritesBoardController.render();


/***/ }),

/***/ "./src/models/city.js":
/*!****************************!*\
  !*** ./src/models/city.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return City; });
const getDirection = (deg) => {
  let direction;

  switch(true) {
    case deg > 11.25 && deg < 33.75:
      direction = `North-northeast`;
      break;

    case deg > 33.75 && deg < 56.25:
      direction = `Northeast`;
      break;
      
    case deg > 56.25 && deg < 78.75:
    direction = `East-northeast`;
    break;
    
    case deg > 78.75 && deg < 101.25:
      direction = `East`;
      break;
    
    case deg > 101.25 && deg < 123.75:
      direction = `East-southeast`;
      break;
    
    case deg > 123.75 && deg < 146.25:
      direction = `Southeast`;
      break;
    
    case deg > 146.25 && deg < 168.75:
      direction = `South-southeast`;
      break;
    
    case deg > 168.75 && deg < 191.25:
      direction = `South`;
      break;
    
    case deg > 191.25 && deg < 213.75:
      direction = `South-southwest`;
      break;
    
    case deg > 213.75 && deg < 236.25:
      direction = `Southwest`;
      break;
    
    case deg > 236.25 && deg < 258.75:
      direction = `West-southwest`;
      break;
    
    case deg > 258.75 && deg < 281.25:
      direction = `West`;
      break;
    
    case deg > 281.25 && deg < 303.75:
      direction = `West-northwest`;
      break;
    
    case deg > 303.75 && deg < 326.25:
      direction = `Northwest`;
      break;
    
    case deg > 326.25 && deg < 348.75:
      direction = `North-northwest`;
      break;
  
    default:
      direction = `North`;
  }

  return direction;
};

class City {
  constructor() {
    this.setData = this.setData.bind(this);
  }

  setData(data) {
    this.id = data[`id`];
    this.name = data[`name`];
    this.description = data[`weather`][0][`description`];
    this.icon = data[`weather`][0][`icon`];
    this.temp = Math.round(data[`main`][`temp`]);
    this.wind = {
      speed: data[`wind`][`speed`],
      direction: getDirection(data[`wind`][`deg`])
    };
    this.clouds = data[`clouds`][`all`];
    this.pressure = data[`main`][`pressure`];
    this.humidity = data[`main`][`humidity`];
    this.coordinates = {
      latitude: data[`coord`][`lat`],
      longitude: data[`coord`][`lon`]
    };
  }
}


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: render, remove, replace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
const render = (container, component, position = `beforeend`) => {
  switch (position) {
    case `afterend`:
      container.after(component.getElement());
      break;

    case `beforeend`:
      container.append(component.getElement());
      break;

    case `afterbegin`:
      container.prepend(component.getElement());
      break;

    default:
      throw new Error(`Only 'afterend', 'beforeend' or 'afterbegin'.`);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(newElement && oldElement && parentElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map