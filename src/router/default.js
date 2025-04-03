import express from "express";
import { StatusCode } from "../errors/StatusCode.js";
const route = express.Router();

// route.get('*', (req, res) => {
//   res.status(StatusCode.NOT_FOUND).json({ message: "Page not found" });
// });

route.get("/", (req, res) => {
  res.render('index');
}
);

export default route;