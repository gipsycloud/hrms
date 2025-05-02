import jwt from "jsonwebtoken";
import { StatusCode } from "../errors/StatusCode.js";
import prisma from "../database/index.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(StatusCode.FORBIDDEN).json({ message: "Forbidden" });
    }

    try {
      // Fetch the user from the database using the ID from the decoded token
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(StatusCode.NOT_FOUND).json({ message: "User not found" });
      }

      // Attach the complete user object to the request
      req.user = user;
      console.log("current user: " + user.email);
      next();
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  });
}

export default authenticateToken;