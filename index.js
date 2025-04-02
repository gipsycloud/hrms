import express from 'express';
import { progressBar } from './src/views/partials/progressbar.js';
import { PORT, HOST } from './src/config/config.js';
import { connectDatabase } from './src/database/index.js';

//db connection
connectDatabase();
const app = express();

app.get('/', async (req, res) => {
  try {
    res.send('Hello World !');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

progressBar();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});