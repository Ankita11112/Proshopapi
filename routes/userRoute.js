import { Router } from "express";
import {
  deleteUser,
  getUsers,
  updateAdmin,
  updateUser,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import { adminAuth, userAuth } from "../middlewares/authMiddleware.js";

const routes = Router();

routes.get("/", adminAuth, getUsers);
routes.post("/login", userLogin);
routes.post("/register", userRegister);
routes.put("/", userAuth, updateUser);
routes.put("/admin/:_id", adminAuth, updateAdmin);
routes.delete("/:_id", adminAuth, deleteUser);

export default routes;
