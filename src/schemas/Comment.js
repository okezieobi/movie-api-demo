import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

import Schema from '.';

const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);

export default class CommentSchema extends Schema {
  async validateSelectQuery() {
    const schema = ajv.compile({
      $async: true,
      type: 'object',
      additionalProperties: false,
      properties: {
        id: { type: 'string', format: 'uuid' },
      },
    });
    return schema(this.data);
  }
}
