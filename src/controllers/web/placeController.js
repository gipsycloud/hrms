import { StatusCode } from "../../errors/StatusCode.js";
import { submitPlace } from "./services/place.service.js";


export const getAllPlaces = async (req, res) => {
  try {
    const locals = {
      title: "All Places",
      description: "List of all places",
      keywords: "places, list",
    };
    // const places = await getAllPlaces();
    res.render("place", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const createPlace = async (req, res) => {
  try {
    const locals = {
      title: "Create Place",
      description: "Create a new place",
      keywords: "create, place",
    };
    res.render("place/create", { locals });
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
    res.render("place", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};
