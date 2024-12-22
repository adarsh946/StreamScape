import client from "./prisma/prisma";
import express from "express";

const app = express();

const signup = app.post("/", (req, res) => {
  const { fullname, password } = req.body;
});
