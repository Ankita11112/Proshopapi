import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./routes/ProductRoute.js";
import cors from "cors";
import users from "./routes/userRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import carts from "./routes/cartRoute.js";
import orders from "./routes/orderRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/products", products);
app.use("/api/user", users);
app.use("/api/cart", carts);
app.use("/api/orders", orders);
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () =>
  console.log("server is running on port 5000".yellow.bold.underline)
);
