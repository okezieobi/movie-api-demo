/* eslint-disable camelcase */
import SwAPI from '../apis/Swapi';
import CommentModel from '../models/comment';

export default class CommentServices {
  constructor(model = { Comment: CommentModel }, api = { SwAPI }) {
    this.model = model;
    this.api = api;
    this.createOne = this.createOne.bind(this);
  }

  async createOne({ ip_address, film_id }) {
    await new this.api.SwAPI().getFilm(film_id);
    const { insertOne } = new this.model.Comment();
    const data = await insertOne({ ip_address, film_id });
    return { message: 'Comment successfully created', data };
  }
}
