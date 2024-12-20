import express from "express";
import signIn from "./routes/authRoute.js";
const app = express();

app.use("/api/auth", signIn);

app.listen(3000);
