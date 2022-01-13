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
  const response = await data.json();
  if (response.status === 'error') {
    throw new AppError(response.message, 'Payment', response.data);
  }
  return response;
};

export default class MovieAPI {
  constructor(customFetch = handleFetch) {
    this.customFetch = customFetch;
  }
}
