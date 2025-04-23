import { StatusCode } from "../../errors/StatusCode.js";
import bcrypt from "bcryptjs";
import prisma from "../../database/index.js";
import jwt from "jsonwebtoken";
import { token } from "morgan";
import { RedirectHelper } from "../../utils/redirectHelper.js";

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
    res.redirect("/login");
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
      return res.render("auth/login", {
        error: "Invalid email or password",
      });
    }
    const PasswordValid = await bcrypt.compare(password, user.password);
    if (!PasswordValid) {
      return res.render("auth/login", {
        error: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
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

export const dashboardController = async (req, res) => {
  try {
    console.log("Authenticated User: ", req.user.username);
    if (!req.cookies.token) {
      RedirectHelper.redirect(res, "/");
    }
    // const alert = req.sesions.alert || null;
    // req.session.alert = null;
    res.render("auth/dashboard", {
      title: "Dashboard",
      description: "User Dashboard",
      keywords: "dashboard, user",
      success: "Login successful",
      user: req.user,
      // alert,
      token: req.cookies.token,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};