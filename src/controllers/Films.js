/* eslint-disable camelcase */
import FilmsServices from '../services/Films';
import Controller from '.';

export default class FilmsController extends Controller {
  constructor(Services = FilmsServices, key = 'film') {
    super(key);
    this.Services = Services;
    this.listFilms = this.listFilms.bind(this);
    this.getFilm = this.getFilm.bind(this);
  }

  listFilms({ query: { search_field } }, res, next) {
    const { findFilms } = new this.Services();
    return this.handleService({
      method: findFilms, res, next, arg: search_field,
    });
  }

  getFilm({ params: { id } }, res, next) {
    const { retrieveFilm } = new this.Services();
    return this.handleService({
      method: retrieveFilm, res, next, arg: id,
    });
  }
}
