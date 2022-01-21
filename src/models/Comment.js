/* eslint-disable no-console */
/* eslint-disable camelcase */
import connect from './connect';
import AppError from '../errors';
import CommentSchema from '../schemas/Comment';

const sqlFiles = {
  createTable: connect.sql('../../sql/comments/table.sql'),
  insertOne: connect.sql('../../sql/comments/insert.sql'),
  filterMany: connect.sql('../../sql/comments/filter.sql'),
  paginate: connect.sql('../../sql/comments/paginate.sql'),
  paginate_last: connect.sql('../../sql/comments/paginate_last.sql'),
};

class CommentModel {
  constructor(schemas = { Comment: CommentSchema }) {
    this.schemas = schemas;
    this.getPaginated = this.getPaginated.bind(this);
    this.setupTable = async () => {
      await connect.db.none(sqlFiles.createTable);
    };
    this.insertOne = async (data) => {
      const result = await connect.db.one(sqlFiles.insertOne, data).catch((err) => {
        throw new AppError(err.message, 'Query', err);
      });
      return result;
    };
    this.filterMany = async (data) => {
      await connect.db.task(async (t) => {
        await Promise.all(data.map(async (film) => {
          const placeholder = film;
          placeholder.comments = await t.any(sqlFiles.filterMany, [placeholder.episode_id]);
          placeholder.comment_count = placeholder.comments.length;
        }));
      });
    };
  }

  async getPaginated(id) {
    await new this.schemas.Comment({ id }).validateSelectQuery();
    if (id != null) return connect.db.any(sqlFiles.paginate, [id]);
    return connect.db.any(sqlFiles.paginate_last);
  }
}

new CommentModel().setupTable().catch(console.error);

export default CommentModel;
