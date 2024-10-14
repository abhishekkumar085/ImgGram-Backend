import express from 'express';
import morgan from 'morgan';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';

const app = express();
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.get('/ping', (req, res) => {
  return res.json({ message: 'Pong' });
});

app.listen(PORT, () => {
  console.log('Server listening on Port', PORT);
  connectDB();
});
