import CommentServices from '../services/Comments';

import Controller from '.';

export default class CommentController extends Controller {
  constructor(Services = CommentServices, key = 'comment', ...params) {
    super(key, params);
    this.Services = Services;
    this.createOne = this.createOne.bind(this);
    this.getPaginated = this.getPaginated.bind(this);
  }

  createOne({ body, ip }, res, next) {
    const { createOne } = new this.Services();
    return this.handleService({
      method: createOne, res, next, arg: { ...body, ip_address: ip },
    });
  }

  getPaginated({ query: { id } }, res, next) {
    const { getPaginated } = new this.Services();
    return this.handleService({
      method: getPaginated, res, next, arg: id,
    });
  }
}
