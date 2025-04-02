import express from 'express';
import { progressBar } from './src/views/partials/progressbar.js';
import { PORT, HOST } from './src/config/config.js';
const app = express();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

progressBar();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});