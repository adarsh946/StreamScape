import { Router } from "express";
import { signUpController } from "../controllers/authControlers";

const router = Router();

router.post("/signup", signUpController);

export default router;
