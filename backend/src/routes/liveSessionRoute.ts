import { Router } from "express";
import { createLiveSession } from "../controllers/liveSessionControllers";

const router = Router();

router.post("/session", createLiveSession);

export default router;
