import dotenv from "dotenv";
import express from "express";
import db from "./config/connection.js";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import snipsRoutes from "./routes/snipRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/snip", snipsRoutes);

const startServer = async () => {
  await db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
};

startServer();