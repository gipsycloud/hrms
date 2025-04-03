import express from 'express';
import route from './src/router/default.js';
import { progressBar } from './src/views/partials/progressbar.js';
import { PORT, HOST } from './src/config/config.js';
import { connectDatabase } from './src/database/index.js';
import expressEjsLayouts from 'express-ejs-layouts';

//db connection
connectDatabase();

const app = express();

// Templating Engine
app.use(expressEjsLayouts);
app.set('views', './src/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use("/", route);
progressBar();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});