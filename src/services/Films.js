import SwAPI from '../apis/Swapi';

export default class FilmsServices {
  constructor(api = { SwAPI }) {
    this.api = api;
    this.findFilms = this.findFilms.bind(this);
    this.retrieveFilm = this.retrieveFilm.bind(this);
  }

  async findFilms(searchField) {
    const { listFilms } = new this.api.SwAPI();
    const films = await listFilms(searchField);
    const sortedFilms = films.results.sort((a, b) => -a.release_date.localeCompare(b.release_date));
    return sortedFilms;
  }

  async retrieveFilm(id) {
    const { getFilm } = new this.api.SwAPI();
    return getFilm(id);
  }
}
