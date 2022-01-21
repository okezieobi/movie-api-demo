/* eslint-disable camelcase */
import nodeFetch from 'node-fetch';

import AppError from '../errors';
import PeopleSchema from '../schemas/People';

const handleFetch = async (endpoint, method, body) => {
  const options = {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = await nodeFetch(`https://swapi.dev/api/${endpoint}`, options);
  if (data.status > 399) throw new AppError(data.statusText, 'Request', { code: data.status });
  const response = await data.json();
  return response;
};

export default class SwAPI {
  constructor(customFetch = handleFetch, schemas = { People: PeopleSchema }) {
    this.customFetch = customFetch;
    this.schemas = schemas;
    this.listFilms = this.listFilms.bind(this);
    this.getFilm = this.getFilm.bind(this);
    this.listPeople = this.listPeople.bind(this);
    this.searchPeople = this.searchPeople.bind(this);
  }

  async listFilms(searchField) {
    const endpoint = searchField != null ? `films/?search=${searchField}` : 'films';
    return this.customFetch(endpoint);
  }

  async getFilm(id) {
    const endpoint = `films/${id}`;
    const result = await this.customFetch(endpoint);
    return result;
  }

  async listPeople(page = '1') {
    await new this.schemas.People({ page: parseFloat(page) }).validatePageNo();
    const endpoint = `people/?page=${page}`;
    return this.customFetch(endpoint);
  }

  async searchPeople(search_field) {
    await new this.schemas.People({ search_field }).validateSearchField();
    const endpoint = `people/?search=${search_field}`;
    return this.customFetch(endpoint);
  }
}
