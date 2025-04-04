import express from "express";
import { registerpage, registerController, loginpage, loginController, dashboardController } from "../controllers/web/authController.js";
import { about, home } from "../controllers/web/webController.js";

const route = express.Router();

route.get('/', home);
route.get('/about', about);
route.get('/register', registerpage);
route.post('/register', registerController);
route.get('/login', loginpage);
route.post('/login', loginController);
route.get('/dashboard', dashboardController);

export default route;