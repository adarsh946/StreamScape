import { Router } from "express";
import {
  allLiveSession,
  createLiveSession,
} from "../controllers/liveSessionControllers";

const router = Router();

router.post("/session", createLiveSession);
router.get("/sessions", allLiveSession);

export default router;
