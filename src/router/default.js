import express from "express";
import { StatusCode } from "../errors/StatusCode.js";
const route = express.Router();

route.get("/", (req, res) => {
  const locals = {
    title: "Home",
    description: "Welcome to the home page",
    keywords: "home, welcome",
  }
  res.render('index', { locals });
});

route.get("/about", (req, res) => {
  res.render('about');
});
// route.get('*', (req, res) => {
//   res.status(404).send('Page Not Found');
// });

export default route;