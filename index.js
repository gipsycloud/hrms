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
import { Server } from 'socket.io';
import { createServer } from 'http';

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

const server = createServer(app);
const io = new Server(server, {
  cors: {
    orgin: "*",
    methods: ["GET", "POST"],
  }
});

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.post('/notify', (req, res) => {
  console.log("\n📨 Received notification request:", {
    headers: req.headers,
    body: req.body
  });
  const { userId, message } = req.body;
  io.to(userId).emit('notification', message);
  res.setHeader('X-Powered-By', 'Express');
  console.log(`Notification sent to user ${userId}:`, message);
  console.log('Response headers:', res.getHeaders());
  console.log('Response body:', { success: true, message: 'Notification sent' });
  res.status(200).json({ success: true, message: 'Notification sent' });
});

//socket.io connection
io.on('connection', (socket) => {
  consolole.log('user connected:', socket.id);
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined the room`);
  });

  socket.disconnect(() => {
    console.log(`User ${socket.id} disconnected`);
  }
  );
  socket.on('error', (err) => {
    console.error("💥 Socket error:", err);
  });
})

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