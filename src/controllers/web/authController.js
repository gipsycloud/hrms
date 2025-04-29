import { StatusCode } from "../../errors/StatusCode.js";
import bcrypt from "bcryptjs";
import prisma from "../../database/index.js";
import jwt from "jsonwebtoken";
import { RedirectHelper } from "../../utils/redirectHelper.js";
import { changePassword } from "./services/auth.service.js";

export const registerpage = async (req, res) => {
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

export const registerController = async (req, res) => {
  console.log("Register Controller", req.body);
  try {
    const locals = {
      title: "Register",
      description: "Create a new account",
      keywords: "register, create account",
      success: "Registration successful. Please log in.",
    };
    const { username, email, password } = req.body;
    // Validate input
    if (!username || !email || !password) {
      locals
      return res.render("auth/register", { locals });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })
    // await user.save()'
    res.redirect("/");
    // res.render("auth/register", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const loginpage = async (req, res) => {
  try {
    const locals = {
      title: "Login",
      description: "Login to your account",
      keywords: "login, sign in",
    };
    res.render("auth/login", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (!user) {
      return res.render("/", {
        error: "Invalid email or password",
      });
    }
    const PasswordValid = await bcrypt.compare(password, user.password);
    if (!PasswordValid) {
      RedirectHelper.redirect(res, "/login", {
        error: "Invalid email or password",
      });
      return;
    }
    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { httpOnly: true });  // user for cookie_parser
    // req.session.alert = {
    //   type: "success",
    //   message: "Login successful",
    // }
    res.redirect("/dashboard");

  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    // res.redirect("/login");  => for me
    RedirectHelper.redirect(res, "/");
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
}

export const profileController = async (req, res) => {
  try {
    const locals = {
      title: "Profile",
      description: "User Profile",
      keywords: "profile, user",
    };
    res.render("auth/profile", { locals, layout: "../views/layouts/admin_layout", user: req.user });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const locals = {
      title: "Change Password",
      description: "Change your password",
      keywords: "change password, update password",
    };
    const { oldPassword, newPassword } = req.body;
    const response = await changePassword(req.user.id, oldPassword, newPassword);
    if (response.error) {
      return res.render("auth/change_password", { locals, error: response.error });
    }
    req.session.alert = {
      type: "success",
      message: "Password changed successfully",
    };
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};