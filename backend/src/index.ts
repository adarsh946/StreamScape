import express from "express";
import authRoutes from "./routes/authRoute";
import liveSessionRoute from "./routes/liveSessionRoute";

const app = express();
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", liveSessionRoute);

app.listen(3000);
