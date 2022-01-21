/* eslint-disable camelcase */
import SwAPI from '../apis/Swapi';
import CommentModel from '../models/Comment';

export default class CommentServices {
  constructor(model = { Comment: CommentModel }, api = { SwAPI }) {
    this.model = model;
    this.api = api;
    this.createOne = this.createOne.bind(this);
    this.getPaginated = this.getPaginated.bind(this);
  }

  async createOne({ ip_address, film_id, comment }) {
    await new this.api.SwAPI().getFilm(film_id);
    const { insertOne } = new this.model.Comment();
    const data = await insertOne({ ip_address, film_id, comment });
    return { message: 'Comment successfully created', data };
  }

  async getPaginated(id) {
    const { getPaginated } = new this.model.Comment();
    const comments = await getPaginated(id);
    if (comments.length > 0) {
      const { getFilm } = new this.api.SwAPI();
      await Promise.all(comments.map(async (comment) => {
        const placeholder = comment;
        placeholder.film = await getFilm(placeholder.film_id);
      }));
    }
    return { message: 'Comments successfully retrieved', data: comments };
  }
}
