import bcrypt from "bcryptjs";
import prisma from "../../../database/index.js";
import jwt from "jsonwebtoken";
import { StatusCode } from "../../../errors/StatusCode.js";

export const changePassword = async (userId, oldPassword, newPassword) => {
  if (!userId || !oldPassword || !newPassword) {
    throw new Error("User ID, old password, and new password are required.");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  console.log(oldPassword, newPassword);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedPasssword = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });
  return updatedPasssword;
};