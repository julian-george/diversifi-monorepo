import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./routers/auth-router";
import countryRouter from "./routers/country-router.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_URI as string, () => {
  console.log("Connected to mongodb");
});
app.listen({ port: process.env.PORT }, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(express.json());

app.use("/auth", authRouter);
app.use("/country", countryRouter);
