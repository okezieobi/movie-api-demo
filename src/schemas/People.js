import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';

const ajv = new Ajv({ allErrors: true });
ajvKeywords(ajv);

export default class PeopleSchema {
  constructor(data) {
    this.data = data;
  }

  async validateSearchField() {
    const schema = ajv.compile({
      $async: true,
      type: 'object',
      additionalProperties: false,
      allRequired: true,
      properties: {
        search_field: { type: 'string' },
      },
    });
    return schema(this.data);
  }

  async validateGender() {
    const schema = ajv.compile({
      $async: true,
      type: 'object',
      additionalProperties: false,
      properties: {
        gender_filter: { enum: ['male', 'female', 'n/a'] },
      },
    });
    return schema(this.data);
  }

  async validatePageNo() {
    const schema = ajv.compile({
      $async: true,
      type: 'object',
      additionalProperties: false,
      allRequired: true,
      properties: {
        page: { type: 'integer' },
      },
    });
    return schema(this.data);
  }
}
