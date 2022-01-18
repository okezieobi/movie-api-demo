/* eslint-disable camelcase */
import SwAPI from '../apis/Swapi';

export default class PeopleServices {
  constructor(api = { SwAPI }) {
    this.api = api;
    this.listPeople = this.listPeople.bind(this);
  }

  async listPeople({ search_field, page, gender_filter }) {
    const { listPeople } = new this.api.SwAPI();
    const data = await listPeople({ search_field, page });
    const sortedData = data.results.sort((a, b) => a.height - b.height);
    const filteredData = gender_filter != null ? sortedData.results
      .filter(({ gender }) => gender === gender_filter) : sortedData;
    filteredData.total_no_characters = filteredData.results.length;
    filteredData.total_height = { cm: 0 };
    filteredData.results.forEach((filtered) => {
      filteredData.total_height.cm += filtered.height;
    });
    filteredData.total_height.ft = filteredData.total_height.cm / 30.48;
    return { message: 'Movie characters retrieved', data: filteredData };
  }
}
