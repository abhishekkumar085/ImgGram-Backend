import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
  return res.json({ message: 'Pong' });
});

app.listen(3000, () => {
  console.log('server runnning');
});
