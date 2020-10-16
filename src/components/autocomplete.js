import AbstractComponent from './abstract-component';

const createAutocompleteTemplate = () => {
  return (
    `<div class="favorites__autocomplete visually-hidden"></div>`
  );
}

export default class Autocomplete extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createAutocompleteTemplate();
  }
}