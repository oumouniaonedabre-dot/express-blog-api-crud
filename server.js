import express from 'express';
import postsRouter from './router/posts.js';

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.json());

app.use('/posts', postsRouter);

app.get('/pizza', (req, res) => {
  res.send('lista delle pizze');
});

app.get('/pizzas/:id', function (req, res) {
  res.send('Dettaglio pizza');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
