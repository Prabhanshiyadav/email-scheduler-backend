import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import emailRoutes from "./routes/emailRoutes";

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 SQLite Database connected");

    app.use("/api/emails", emailRoutes);

    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
