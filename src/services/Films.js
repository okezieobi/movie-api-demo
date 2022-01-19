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
    const sortedFilms = { ...films };
    sortedFilms.results = films.results.length > 1 ? films.results
      .sort((a, b) => -a.release_date.localeCompare(b.release_date)) : films;
    return { message: 'Films successfully fetched', data: sortedFilms };
  }

  async retrieveFilm(id) {
    const { getFilm } = new this.api.SwAPI();
    const data = await getFilm(id);
    return { message: 'Film successfully retrieved', data };
  }
}
