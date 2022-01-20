/* eslint-disable no-console */
/* eslint-disable camelcase */
import Connect from './connect';

class CommentModel extends Connect {
  constructor() {
    super();
    this.setupTable = this.setupTable.bind(this);
    this.insertOne = this.insertOne.bind(this);
  }

  async setupTable() {
    const sqlFile = this.sql('../../sql/comments/table.sql');
    await this.db.none(sqlFile);
  }

  async insertOne(data) {
    const sqlFile = this.sql('../../sql/comments/insert.sql');
    return this.db.one(sqlFile, data);
  }
}

new CommentModel().setupTable().catch(console.error);

export default CommentModel;
