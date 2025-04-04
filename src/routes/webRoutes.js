import express from "express";
import { registerController } from "../controllers/web/authController.js";
import { about, home } from "../controllers/web/webController.js";

const route = express.Router();

route.get('/', home);
route.get('/about', about);
route.get('/register', registerController);

export default route;