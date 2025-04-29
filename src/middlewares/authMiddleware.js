import jwt from "jsonwebtoken";
import { StatusCode } from "../errors/StatusCode.js";
import prisma from "../database/index.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Cookies token: " + token);
  if (!token) {
    return res.redirect("/");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    // if (err) {
    //   return res.status(StatusCode.FORBIDDEN).json({ message: "Forbidden" });
    // }
    try {
      const userId = jwt.decode(token).id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });
      }
      res.user = user;
      console.log("User in authmiddleware: " + user.email);
    } catch (err) {
      console.error(err);
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
    req.user = user;
    console.log("current user: " + user.email);
    next();
  });
}

export default authenticateToken;