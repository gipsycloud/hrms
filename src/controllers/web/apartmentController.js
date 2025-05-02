import prisma from "../../database/index.js";
import { StatusCode } from "../../errors/StatusCode.js";
import { getAllApartments, getById, submitApartment, updatedApartment } from "./services/apartment.service.js";

export const getAllApartment = async (req, res) => {
  try {
    const locals = {
      title: "All Apartments",
      description: "List of all Apartments",
      keywords: "apartment, list",
    }
    const apartments = await getAllApartments();
    // const placedata = await prisma.place.findMany({
    //   where: { id: apartments.placeId },
    //   select: {
    //     id: true,
    //     address: true,
    //   }
    // });
    // console.log(placedata);
    res.render('apartment', { apartments, user: req.user, locals, layout: '../views/layouts/admin_layout' });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}

export const getApartmentByIdController = async (req, res) => {
  try {
    const locals = {
      title: "Apartment Details",
      description: "Details of an apartment",
      keywords: "apartment, details",
    }
    const apartment = await getById(req.params.id);
    if (!apartment) {
      return res.status(StatusCode.NOT_FOUND).send("Apartment not found");
    }
    res.render('apartment/show', { apartment, user: req.user, locals, layout: '../views/layouts/admin_layout' });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}
export const createApartment = async (req, res) => {
  try {
    const locals = {
      title: "Create Apartment",
      description: "Create a new apartment",
      keywords: "create, apartment",
    }
    const placedata = await prisma.place.findMany({
      where: { id: req.user.placeId },
      select: {
        id: true,
        email: true,
        phone: true,
        address: true,
        description: true,
      }
    });
    // console.log(placedata);
    res.render('apartment/create', { places: placedata, user: req.user, locals, layout: '../views/layouts/admin_layout' });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}

export const createApartmentController = async (req, res) => {
  try {
    const newApartment = await submitApartment(req.body, req);
    console.log(req.body);
    req.session.alert = { type: 'success', message: 'Apartment created successfully!' };
    res.redirect('/apartment');
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const editApartment = async (req, res) => {
  try {
    const locals = {
      title: "Edit Apartment",
      description: "Edit an apartment",
      keywords: "edit, apartment",
    }
    const placedata = await prisma.place.findMany({
      where: { id: req.user.placeId },
      select: {
        id: true,
        email: true,
        phone: true,
        address: true,
        description: true,
      }
    });
    const apartment = await getById(req.params.id);
    if (!apartment) {
      req.session.alert = { type: 'error', message: 'Apartment not found!' };
      return res.redirect('/apartment');
    }
    res.render('apartment/edit', { places: placedata, apartment, user: req.user, locals, layout: '../views/layouts/admin_layout' });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const updateApartmentController = async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const updateApartment = await updatedApartment(apartmentId, req.body);
    req.session.alert = { type: 'success', message: 'Apartment updated successfully!' };
    res.redirect('/apartment');
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};