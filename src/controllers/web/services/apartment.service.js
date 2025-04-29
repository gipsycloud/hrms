import prisma from "../../../database/index.js";

export const getAllApartments = async () => {
  try {
    const apartments = await prisma.apartment.findMany({
      select: {
        id: true,
        street: true,
        apartment_no: true,
        floor: true,
        direction: true,
      }
    });
    return apartments;
  } catch (err) {
    throw new Error("Error fetching apartments: " + err.message);
  }

}