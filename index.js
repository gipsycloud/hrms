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
import cors from 'cors';
import redis from 'redis';
import { createServer } from 'http';
import { initializeSocket } from './src/utils/notification.js';

const __filename = fileURLToPath(import.meta.url); // Get the file path
const __dirname = dirname(__filename); // Get the directory path

console.log('Filename:', __filename);
console.log('Directory:', __dirname);

//db connection
connectDatabase();

const app = express();
app.use(express.json()); // middleware for parsing URL-encoded data
app.use(cookieParser());
app.use(cors());

const httpServer = createServer(app);
const io = initializeSocket(httpServer); // Initialize socket.io with the server

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.post('/notify', (req, res) => {
  // console.log("\n📨 Received notification request:", {
  //   headers: req.headers,
  //   body: req.body
  // });
  ; // Emit the notification to all connected clients
  // redisClient.publish('notifications', JSON.stringify(req.body)); // Publish the notification to Redis channel
  // console.log(`Notification sent to user in node ${userId}: ${message}`);
  console.log(req.body.message, req.body.userId);
  
  const userId = req.body.userId; // Assuming the user ID is sent in the request body
  res.status(200).json({ 
    success: true, 
    message:  req.body || 'Notification sent successfully',
    userId: userId,
    data: req.body
  });
});

app.use(express.static('public'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Templating Engine
app.use(expressEjsLayouts);
app.use(bodyParser.urlencoded({ extended: true })); // middleware for parsing URL-encoded data
app.use(bodyParser.json());   // middleware for parsing JSON

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

app.use((req, res, next) => {
  console.log('Session alert (before):', req.session.alert);
  res.locals.alert = req.session.alert;
  console.log('Locals alert:', res.locals.alert);
  delete req.session.alert;
  next();
});

app.set('views', './src/views');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/check_session', (req, res) => {
  res.json({ session: req.session });
});

// routes
app.use("/", webRoutes);
app.use("/api/V1", apiRoutes);
progressBar();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});