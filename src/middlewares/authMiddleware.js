import jwt from "jsonwebtoken";
import { StatusCode } from "../errors/StatusCode.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Cookies token: " + token);
  if (!token) {
    return res.redirect("/login");
    // return res.status(StatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCode.FORBIDDEN).json({ message: "Forbidden" });
    }
    req.user = user;
    console.log("user" + user);
    next();
  });
}

export default authenticateToken;