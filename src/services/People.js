/* eslint-disable camelcase */
import SwAPI from '../apis/Swapi';
import PeopleSchema from '../schemas/People';

export default class PeopleServices {
  constructor(api = { SwAPI }, schema = { People: PeopleSchema }) {
    this.api = api;
    this.schema = schema;
    this.listPeople = this.listPeople.bind(this);
    this.searchPeople = this.searchPeople.bind(this);
  }

  async listPeople({ page, gender_filter }) {
    const { listPeople } = new this.api.SwAPI();
    const people = await listPeople(parseFloat(page));
    people.sorted_results = people.results
      .sort((a, b) => parseFloat(a.height) - parseFloat(b.height));
    await new this.schema.People({ gender_filter }).validateGender();
    people.filtered_results = gender_filter != null ? people.results
      .filter(({ gender }) => gender === gender_filter) : people.sorted_results;
    people.total_no_characters = people.filtered_results.length > 1
      ? people.filtered_results.length : 0;
    people.total_height = { cm: 0 };
    if (people.filtered_results.length > 0) {
      people.filtered_results.forEach((filteredPerson) => {
        if (filteredPerson.height !== 'unknown') people.total_height.cm += parseFloat(filteredPerson.height);
      });
    }
    people.total_height.ft = people.total_height.cm / 30.48;
    return { message: 'Movie characters successfully retrieved', data: people };
  }

  async searchPeople(search_field) {
    const { searchPeople } = new this.api.SwAPI();
    const data = await searchPeople(search_field);
    return { message: 'Movie characters successfully searched', data };
  }
}
