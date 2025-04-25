import prisma from "../../database/index.js";
import { StatusCode } from "../../errors/StatusCode.js";
import { getAllPlaces, getById, submitPlace, updatedPlace } from "./services/place.service.js";

export const getAll = async (req, res) => {
  try {
    const locals = {
      title: "All Places",
      description: "List of all places",
      keywords: "places, list",
    };
    const places = await getAllPlaces();
    res.render("place", { places, user: req.user, locals, layout: "../views/layouts/admin_layout" });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}

export const createPlace = async (req, res) => {
  try {
    const locals = {
      title: "Create Place",
      description: "Create a new place",
      keywords: "create, place",
    };
    res.render("place/create", { user: req.user, locals, layout: "../views/layouts/admin_layout" });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const createPlaceController = async (req, res) => {
  console.log("Create Place Controller", req.body);
  const locals = {
    title: "Create Place",
    description: "Create a new place",
    keywords: "create, place",
  };
  try {
    const newPlace = await submitPlace(req.body);
    res.redirect('/place');
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const editPlace = async (req, res) => {
  try {
    const locals = {
      title: "Edit Place",
      description: "Edit a place",
      keywords: "edit, place",
    };
    const placeId = req.params.id;
    const place = await getById(placeId);
    if (!place) {
      return res.status(StatusCode.NOT_FOUND).send("Place not found");
    }
    res.render("place/edit", { place, user: req.user, locals, layout: "../views/layouts/admin_layout" });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const updatePlaceController = async (req, res) => {
  try {
    const locals = {
      title: "Update Place",
      description: "Update a place",
      keywords: "update, place",
    };
    const placeId = req.params.id;
    const updatePlace = await updatedPlace(placeId, req.body);
    if (!updatePlace) {
      return res.status(StatusCode.NOT_FOUND).send("Place not found");
    }
    // res.render("place", { place: updatePlace, user: req.user, locals, layout: "../views/layouts/admin_layout" });
    res.redirect('/place');
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}

export const deletePlaceController = async (req, res) => {
  console.log(req.params.id);
  try {
    const locals = {
      title: "Delete Place",
      description: "Delete a place",
      keywords: "delete, place",
    };
    const place = await prisma.place.delete({
      where: { id: req.params.id },
    });
    // return place;
    res.redirect('/place');
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}