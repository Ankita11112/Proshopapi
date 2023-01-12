import Cart from "../models/CartModel.js";
import asyncHandler from "express-async-handler";

const getUserCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const result = await Cart.findOne({ user });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// @desc - create user cart
// @route - POST /api/cart/:user
// @access - Public
const createUserCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const result = await Cart.create({ user, items: [] });
    res.status(201).send({ success: true });
  } catch (error) {
    next(error);
  }
});

// @desc - add item to cart
// @route - PUT /api/cart/:user
// @access - Public
const addCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const { product } = req.body;
    const existItem = await Cart.updateOne(
      { user, "items._id": product._id },
      { $set: { "items.$.qty": product.qty } }
    );
    console.log("existItem", existItem);
    if (existItem.matchedCount != 1) {
      const result = await Cart.updateOne(
        { user },
        { $push: { items: product } }
      );
      if (result.modifiedCount === 0) throw new Error("item not added to cart");
    }
    let data = await Cart.findOne({ user });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// @desc - update qty of cart item
// @route - PUT /api/cart/qty/:user
// @access - Public
const updateQty = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    const { _id, qty } = req.body;
    const result = await Cart.updateOne(
      { user, "items._id": _id },
      { $set: { "items.$.qty": qty } }
    );
    if (result.modifiedCount === 0) throw new Error("qty didn't changed");
    let data = await Cart.findOne({ user });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// @desc - delete item from cart
// @route - DELETE /api/cart/:user/:_id
// @access - Public
const deleteCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { user, _id } = req.params;
    const result = await Cart.updateOne(
      { user },
      { $pull: { items: { _id } } }
    );
    if (result.deleteCount === 0) throw new Error("item didn't deleted");
    let data = await Cart.findOne({ user });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const clearCart = asyncHandler(async (req, res, next) => {
  try {
    const { user } = req.params;
    console.log("user", user);
    const result = await Cart.updateOne({ user }, { $set: { items: [] } });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export {
  getUserCart,
  createUserCart,
  addCartItem,
  updateQty,
  deleteCartItem,
  clearCart,
};
