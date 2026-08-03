import dotenv from "dotenv";
import db from "./config/connection.js";
import { Project } from "./models/Project.js";
import { User } from "./models/User.js";

dotenv.config();

db.once("open", async () => {
  console.log("MongoDB connected");

  const user = await User.create({
    username: "testuser",
    email: "test@test.com",
    password: "password123"
  });

  const project = await Project.create({
    project_name: "My First Project",
    description: "Testing Mongoose",
    color: "#FF5733",
    genre: "Fantasy",
    user: user._id
  });

  console.log(project);

  await db.close();
});