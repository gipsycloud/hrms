import express from "express";
import { registerpage, registerController, loginpage, loginController, dashboardController, logoutController } from "../controllers/web/authController.js";
import { about, home } from "../controllers/web/webController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { createPlace, createPlaceController, deletePlaceController, editPlace, getAll, updatePlaceController } from "../controllers/web/placeController.js";

const route = express.Router();

// route.get('/', home);
route.get('/about', about);
route.get('/register', registerpage);
route.post('/register', registerController);
route.get('/', loginpage);
route.post('/login', loginController);
route.get('/logout', logoutController);
route.get('/dashboard', authenticateToken, dashboardController);
route.get('/place', authenticateToken, getAll);
route.get('/newplace', authenticateToken, createPlace);
route.post('/create', authenticateToken, createPlaceController);
route.get('/place/edit/:id', authenticateToken, editPlace);
route.post('/place/edit/:id', authenticateToken, updatePlaceController);
route.post('/place/delete/:id', authenticateToken, deletePlaceController);

export default route;