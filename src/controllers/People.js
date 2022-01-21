/* eslint-disable camelcase */
import PeopleServices from '../services/People';
import Controller from '.';

export default class PeopleController extends Controller {
  constructor(Services = PeopleServices, key = 'people') {
    super(key);
    this.Services = Services;
    this.listPeople = this.listPeople.bind(this);
    this.searchPeople = this.searchPeople.bind(this);
  }

  listPeople({ query }, res, next) {
    const { listPeople } = new this.Services();
    return this.handleService({
      method: listPeople, res, next, arg: query,
    });
  }

  searchPeople({ query: { search_people } }, res, next) {
    const { searchPeople } = new this.Services();
    return this.handleService({
      method: searchPeople, res, next, arg: search_people,
    });
  }
}
