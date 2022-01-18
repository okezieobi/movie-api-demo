// import Ajv from 'ajv';
// import ajvKeywords from 'ajv-keywords';

// const ajv = new Ajv({ allErrors: true });
// ajvKeywords(ajv);

// export default class PeopleSchema {
//   static async validateQuery(data) {
//     const schema = ajv.compile({
//       $async: true,
//       type: 'object',
//       additionalProperties: false,
//       properties: {
//         gender: { type: 'string' },
//         name: { type: 'string' },
//         height: { type: 'string' },
//         sort_order_height: { enum: ['ascending', 'descending'] },
//       },
//     });
//     return schema(data);
//   }
// }
