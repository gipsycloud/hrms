import prisma from "../../../database/index.js";

export const getAllPlaces = async () => {
  try {
    const places = await prisma.place.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        address: true,
        description: true,
      }
    });
    return places;
  } catch (err) {
    throw new Error("Error fetching places: " + err.message);
  }
}

export const getById = async (placeid) => {
  try {
    const place = await prisma.place.findUnique({
      where: { id: placeid },
      select: {
        id: true,
        email: true,
        phone: true,
        address: true,
        description: true,
      }
    });
    return place;
  } catch (err) {
    throw new Error("Error fetching place: " + err.message);
  }
}

export const submitPlace = async (data) => {
  const { email, phone, address, description } = data;
  try {
    const newPlace = await prisma.place.create({
      data: {
        email,
        phone,
        address,
        description
      },
    });
    return newPlace;
  } catch (err) {
    throw new Error("Error creating place: " + err.message);
  }
}

export const updatedPlace = async (placeId, data) => {
  try {
    const updatedPlace = await prisma.place.update({
      where: { id: placeId },
      data: {
        address: data.address,
        description: data.description
      },
    });
    return updatedPlace;
  } catch (err) {
    throw new Error("Error updating place: " + err.message);
  }
}