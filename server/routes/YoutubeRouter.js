import express from "express";

import { isLoggedIn } from "../middlewares/AuthValidator.js";

import { search } from "../controllers/YoutubeController.js";

const router = express.Router();

router.get("/search", search);

export default router;