import SwAPI from '../apis/Swapi';
import CommentModel from '../models/Comment';

export default class FilmsServices {
  constructor(model = { Comment: CommentModel }, api = { SwAPI }) {
    this.model = model;
    this.api = api;
    this.findFilms = this.findFilms.bind(this);
    this.retrieveFilm = this.retrieveFilm.bind(this);
  }

  async findFilms(searchField) {
    const { listFilms } = new this.api.SwAPI();
    const films = await listFilms(searchField);
    films.results.sort((a, b) => a.release_date.localeCompare(b.release_date));
    const { filterMany } = new this.model.Comment();
    await filterMany(films.results);
    return { message: 'Films successfully fetched', data: films };
  }

  async retrieveFilm(id) {
    const { getFilm } = new this.api.SwAPI();
    const data = await getFilm(id);
    return { message: 'Film successfully retrieved', data };
  }
}
