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

export const submitApartment = async (data) => {
  const { street, apartment_no, floor, direction, placeId } = data;
  try {
    const newApartment = await prisma.apartment.create({
      data: {
        street,
        apartment_no,
        floor,
        direction,
        placeId
      },
    });
    return newApartment;
  } catch (err) {
    throw new Error("Error creating apartment: " + err.message);
  }
}

export const getById = async (apartmentId) => {
  try {
    const apartment = await prisma.apartment.findUnique({
      where: { id: apartmentId },
      select: {
        id: true,
        street: true,
        apartment_no: true,
        floor: true,
        direction: true,
        place: {
          select: {
            id: true,
            address: true,
            phone: true,
            email: true,
            description: true,
          }
        }
      }
    });
    console.log(apartment);
    return apartment;
  } catch (err) {
    throw new Error("Error fetching apartment: " + err.message);
  }
};

export const updatedApartment = async (apartmentId, data) => {
  const { street, apartment_no, floor, direction, placeId } = data;
  try {
    const updatedApartment = await prisma.apartment.update({
      where: { id: apartmentId },
      data: {
        street,
        apartment_no,
        floor,
        direction,
        placeId
      },
    });
    return updatedApartment;
  } catch (err) {
    throw new Error("Error updating apartment: " + err.message);
  }
};