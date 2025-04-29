import prisma from "../../database/index.js";
import { StatusCode } from "../../errors/StatusCode.js";
import { getAllApartments } from "./services/apartment.service.js";

export const getAllApartment = async (req, res) => {
  try {
    const locals = {
      title: "All Apartments",
      description: "List of all Apartments",
      keywords: "apartment, list",
    }
    const apartments = await getAllApartments();
    res.render('apartment', { apartments, user: req.user, locals, layout: '../views/layouts/admin_layout' });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}