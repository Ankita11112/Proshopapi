import { Router } from "express";
import {
  addCartItem,
  clearCart,
  createUserCart,
  deleteCartItem,
  getUserCart,
  updateQty,
} from "../controllers/cartController.js";

const routes = Router();

routes.get("/:user", getUserCart);
routes.post("/:user", createUserCart);
routes.put("/:user", addCartItem);
routes.put("/qty/:user", updateQty);
routes.put("/clear/:user", clearCart);
routes.delete("/:user/:_id", deleteCartItem);

export default routes;
