import express from "express";
import { registerpage, registerController, loginpage, loginController, dashboardController, logoutController } from "../controllers/web/authController.js";
import { about, home } from "../controllers/web/webController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const route = express.Router();

// route.get('/', home);
route.get('/about', about);
route.get('/register', registerpage);
route.post('/register', registerController);
route.get('/', loginpage);
route.post('/login', loginController);
route.get('/logout', logoutController);
route.get('/dashboard', authenticateToken, dashboardController);

export default route;