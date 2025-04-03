import express from 'express';
import route from './src/router/default.js';
import { progressBar } from './src/views/partials/progressbar.js';
import { PORT, HOST } from './src/config/config.js';
import { connectDatabase } from './src/database/index.js';

//db connection
connectDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
app.use("/", route);
progressBar();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});