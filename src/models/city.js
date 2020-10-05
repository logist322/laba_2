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

export default class City {
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
