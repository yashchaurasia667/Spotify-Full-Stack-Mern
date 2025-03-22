import express from "express";

import { isLoggedIn } from "../middlewares/AuthValidator.js";

import { dlp, search, stream, ytSearch } from "../controllers/YoutubeController.js";

const router = express.Router();

router.get("/search", isLoggedIn, search);
router.get("/ytsearch", ytSearch);
// router.get("/stream", isLoggedIn, stream);
router.get("/stream", isLoggedIn, dlp);

export default router;