import prisma from "../database/index.js";
import { StatusCode } from "../errors/StatusCode.js";

export const dashboardController = async (req, res) => {
  try {
    console.log("User Dashboard: ", req.user.username)
    if (!req.cookies.token) {
      RedirectHelper.redirect(res, "/");
    }
    const place = await prisma.place.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        address: true,
        description: true,
      }
    });
    if (!place || place.length === 0) {
      return res.status(StatusCode.NOT_FOUND).render("404", { locals });
    }
    console.log(req.user.username);
    res.render("auth/dashboard", { place: place, user: req.user, locals: { title: "Dashboard", description: "User Dashboard", keywords: "dashboard, user" }, layout: "../views/layouts/admin_layout" });
  } catch (error) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};