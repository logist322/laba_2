import { render } from "../utils/render";

import FavoritesBoardComponent from '../components/favorites-board';

export default class FavoritesBoard {
  constructor(container) {
    this._container = container;
  }

  render() {
    const container = this._container;

    render(container, new FavoritesBoardComponent());
  }
}