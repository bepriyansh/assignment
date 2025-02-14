import express from "express";
import cors from "cors";
import { connectDB } from "./utils/mongodb.js";
import dotenv from "dotenv";
import routes from "./routes.js";
import { errorHandler, notFound } from "./utils/responseHandler.js";
import { logger } from "./utils/middleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add this middleware to log all incoming requests
app.use(logger);

app.use("/api", routes);
app.use(errorHandler);
app.use(notFound);

connectDB();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
