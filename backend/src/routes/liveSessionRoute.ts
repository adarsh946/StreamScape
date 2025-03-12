import { Router } from "express";
import {
  allLiveSession,
  createLiveSession,
  startSession,
} from "../controllers/liveSessionControllers";

const router = Router();

router.post("/session", createLiveSession);
router.get("/sessions", allLiveSession);
router.post("/session/:sessionId/start", startSession);
router.post("/session/:sessionId/end", startSession);

export default router;
