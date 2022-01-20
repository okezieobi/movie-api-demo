/* eslint-disable no-console */
/* eslint-disable camelcase */
import connect from './connect';
import AppError from '../errors';

class CommentModel {
  constructor() {
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
  }
}

new CommentModel().setupTable().catch(console.error);

export default CommentModel;
