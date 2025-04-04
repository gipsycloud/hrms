import { StatusCode } from "../../errors/StatusCode.js";

export const about = async (req, res) => {
  try {
    const locals = {
      title: "About Us",
      description: "Learn more about us",
      keywords: "about, information",
    };
    res.render("about", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

export const home = async (req, res) => {
  try {
    const locals = {
      title: "Home",
      description: "Welcome to the home page",
      keywords: "home, welcome",
    };
    res.render("index", { locals });
  } catch (err) {
    console.error(err);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};


// route.get(/(.*)/, (req, res, next) => {
//   res.status(StatusCode.NOT_FOUND).render('404', {
//     title: "404 Not Found",
//     description: "The page you are looking for does not exist.",
//     keywords: "404, not found",
//   });
// });