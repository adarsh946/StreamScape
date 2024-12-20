import { Router } from "express";

const route = Router();

route.post("/signin", (req, res) => {
  res.send("hii this is shukla");
});

export default route;
