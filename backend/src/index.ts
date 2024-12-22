import express from "express";
import authRoutes from "./routes/authRoute";

const app = express();
app.use(express.json());

app.use("/api/v1", authRoutes);
