import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';

import router from './routes/router';
import swaggerSpec from './utils/swagger';
import errHandler from './errors/handlers';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api-docs', swaggerSpec.serve, swaggerSpec.setup);

app.use('/api/v1', router);

app.get('', (req, res) => { res.redirect('/api-docs'); });

app.use(errHandler);

export default app;
