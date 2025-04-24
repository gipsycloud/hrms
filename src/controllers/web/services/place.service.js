import prisma from "../../../database/index.js";

export const getAllPlaces = async () => {
  try {
    const places = await prisma.place.findMany();
    return places;
  } catch (err) {
    throw new Error("Error fetching places: " + err.message);
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