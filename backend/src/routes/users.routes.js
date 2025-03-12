
// import { Router } from "express";
// import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";

// const router = Router();

// // Test Route
// router.get("/", (req, res) => {
//   res.send({ message: "Users API is working!" });
// });

// router.route("/login").post(login);
// router.route("/register").post(register);
// router.route("/add_to_activity").post(addToHistory);
// router.route("/get_all_activity").get(getUserHistory);

// export default router;

import { Router } from "express";
import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";

const router = Router();

// Test Route to check if the Users API is working
router.get("/", (req, res) => {
  res.send({ message: "Users API is working!" });
});

// Route for user login
router.route("/login").post(login);

// Route for user registration
router.route("/register").post(register);

// Route to add meeting activity to user history
router.route("/add_to_activity").post(addToHistory);

// Route to fetch all user activity history
router.route("/get_all_activity").get(getUserHistory);

// Export the router for use in the main application
export default router;
