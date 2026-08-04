import dotenv from "dotenv";
import express from "express";
import db from "./config/connection.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

const startServer = async () => {
  await db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
};

startServer();