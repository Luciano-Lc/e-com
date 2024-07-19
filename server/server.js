import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
connectDB();
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/prouductRoutes.js";
import { UserRouter } from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", UserRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`SERVER PORT: ${process.env.PORT}`);
});
