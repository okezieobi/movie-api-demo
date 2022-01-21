/* eslint-disable no-console */
/* eslint-disable camelcase */
import connect from './connect';
import AppError from '../errors';
import CommentSchema from '../schemas/Comment';

class CommentModel {
  constructor(schemas = { Comment: CommentSchema }) {
    this.schemas = schemas;
    this.getPaginated = this.getPaginated.bind(this);
    this.setupTable = async () => {
      const sqlFile = connect.sql('../../sql/comments/table.sql');
      await connect.db.none(sqlFile);
    };
    this.insertOne = async (data) => {
      const sqlFile = connect.sql('../../sql/comments/insert.sql');
      const result = await connect.db.one(sqlFile, data).catch((err) => {
        throw new AppError(err.message, 'Query', err);
      });
      return result;
    };
    this.filterMany = async (data) => {
      const sqlFile = connect.sql('../../sql/comments/filter.sql');
      await connect.db.task(async (t) => {
        await Promise.all(data.map(async (film) => {
          const placeholder = film;
          placeholder.comments = await t.any(sqlFile, [placeholder.episode_id]);
          placeholder.comment_count = placeholder.comments.length;
        }));
      });
    };
  }

  async getPaginated(id) {
    await new this.schemas.Comment({ id }).validateSelectQuery();
    const sqlFileOne = connect.sql('../../sql/comments/paginate.sql');
    const sqlFileTwo = connect.sql('../../sql/comments/paginate_last.sql');
    if (id != null) return connect.db.any(sqlFileOne, [id]);
    return connect.db.any(sqlFileTwo);
  }
}

new CommentModel().setupTable().catch(console.error);

export default CommentModel;
