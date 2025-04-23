import express from "express";
import { StatusCode } from "../errors/StatusCode.js";
const route = express.Router();

route.get("/about", (req, res) => {
  res.send("hello")
});

export default route;