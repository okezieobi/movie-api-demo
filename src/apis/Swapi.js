import nodeFetch from 'node-fetch';

const handleFetch = async (endpoint, method, body) => {
  const options = {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = await nodeFetch(`https://swapi.dev/api/${endpoint}`, options);
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
    return this.customFetch(endpoint);
  }
}