/* eslint-disable camelcase */
import nodeFetch from 'node-fetch';

import AppError from '../errors';

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
  constructor(customFetch = handleFetch) {
    this.customFetch = customFetch;
    this.listFilms = this.listFilms.bind(this);
    this.getFilm = this.getFilm.bind(this);
  }

  async listFilms(searchField) {
    const endpoint = searchField != null ? `films/?title=${searchField}` : 'films';
    return this.customFetch(endpoint);
  }

  async getFilm(id) {
    const endpoint = `films/${id}`;
    const result = await this.customFetch(endpoint);
    return result;
  }

  async listPeople({ search_field, page = 1 }) {
    const endpoint = search_field != null ? `people/?page=${page}&name=${search_field}` : `people/?page=${page}`;
    return this.customFetch(endpoint);
  }
}
