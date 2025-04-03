import express from 'express';
import route from './src/router/default.js';
import { progressBar } from './src/views/partials/progressbar.js';
import { PORT, HOST } from './src/config/config.js';
import { connectDatabase } from './src/database/index.js';
import expressEjsLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Get the file path
const __dirname = dirname(__filename); // Get the directory path

console.log('Filename:', __filename);
console.log('Directory:', __dirname);

//db connection
connectDatabase();

const app = express();

app.use(express.static('public'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

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