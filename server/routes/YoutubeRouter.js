import express from "express";

import { isLoggedIn } from "../middlewares/AuthValidator.js";

import { search, stream, ytSearch } from "../controllers/YoutubeController.js";

const router = express.Router();

router.get("/search", isLoggedIn, search);
router.get("/ytsearch", isLoggedIn, ytSearch);
router.get("/stream", isLoggedIn, stream);

export default router;