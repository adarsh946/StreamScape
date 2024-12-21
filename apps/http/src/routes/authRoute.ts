import { Router } from "express";
import {
  signInController,
  singUpController,
} from "../controllers/authControllers.js";

const route = Router();

route.post("/signin", signInController);
route.post("/signup", singUpController);

export default route;
