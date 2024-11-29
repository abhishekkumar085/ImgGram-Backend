import express from 'express';
import morgan from 'morgan';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { options } from './utils/swaggerOptions.js';
import rateLimit from 'express-rate-limit';

// const swaggerDocs = swaggerJSDoc(options);

const app = express();

const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,
  max: 5,
});

app.use(limiter);
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'));
/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Responds with a 'Pong' message.
 *     responses:
 *       200:
 *         description: A successful response.
 */
app.get('/ping', isAuthenticated, (req, res) => {
  console.log(req.user);
  return res.json({ message: 'Pong' });
});

app.use('/api', apiRouter);
const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log('Server listening on Port', PORT);
  connectDB();
});
