import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

// @desc -  to fetch all products
// @route -  GET /api/products
// @access - Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

// @desc -  to fetch single product by ID
// @route - GET /api/products/:_id
// @access - Public
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.status(200).send(product);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

// @desc -  to create new product
// @route - POST /api/products
// @access - Private
const createProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const result = await Product.create(data);
    res.status(200).send(result);
    // if (result) {
    //   const products = await Product.find();
    // } else throw new Error("product not update!");
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

// @desc -  to update product
// @route - PUT /api/products/:_id
// @access - Private
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await Product.findByIdAndUpdate({ _id }, data, {
      new: true,
    });

    res.status(200).send(result);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

// @desc -  to delete specific product
// @route - DELETE /api/products/:_id
// @access - Private
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Product.findByIdAndRemove({ _id });
    // console.log(result);
    res.status(200).send(result);
    // if (result.deletedCount === 1) {
    //   const products = await Product.find();
    // } else throw new Error("product not deleted!");
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

const createReview = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.params;
    const data = req.body;

    const { reviews } = await Product.findById(_id);
    const newReviews = [...reviews, data];
    const rating =
      reviews.length !== 0
        ? newReviews.reduce((acc, i) => acc + i.rating, 0) / newReviews.length
        : data.rating;
    console.log("rating", rating);

    const result = await Product.findByIdAndUpdate(
      { _id },
      {
        $set: { ratings: rating.toFixed(1), numReviews: newReviews.length },
        $push: { reviews: data },
      },
      { new: true }
    );

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
