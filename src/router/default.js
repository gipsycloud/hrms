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

route.get("/register", (req, res) => {
  res.render('features/register');
});

route.get(/(.*)/, (req, res, next) => {
  res.status(StatusCode.NOT_FOUND).render('404', {
    title: "404 Not Found",
    description: "The page you are looking for does not exist.",
    keywords: "404, not found",
  });
});

export default route;