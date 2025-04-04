import { StatusCode } from "../../errors/StatusCode.js";

export const registerController = async (req, res) => {
  try {
    const locals = {
      title: "Register",
      description: "Create a new account",
      keywords: "register, create account",
    };
    res.render("auth/register", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};