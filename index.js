import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import webRoutes from './src/routes/webRoutes.js';
import apiRoutes from './src/routes/apiRoutes.js';
import { progressBar } from './src/views/partials/progressbar.js';
import { PORT, HOST } from './src/config/config.js';
import { connectDatabase } from './src/database/index.js';
import expressEjsLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url); // Get the file path
const __dirname = dirname(__filename); // Get the directory path

console.log('Filename:', __filename);
console.log('Directory:', __dirname);

//db connection
connectDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Templating Engine
app.use(expressEjsLayouts);
app.use(bodyParser.json());

// configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
  },
}));

app.set('views', './src/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use("/", webRoutes);
app.use("/api/V1", apiRoutes);
progressBar();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});