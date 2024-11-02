import express from 'express';
import morgan from 'morgan';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
// app.use(
//   morgan(':method :url :status :res[content-length] - :response-time ms')
// );

app.use(morgan('combined'));

app.get('/ping', isAuthenticated, (req, res) => {
  console.log(req.user);
  return res.json({ message: 'Pong' });
});

app.use('/api', apiRouter);
app.listen(PORT, () => {
  console.log('Server listening on Port', PORT);
  connectDB();
});
