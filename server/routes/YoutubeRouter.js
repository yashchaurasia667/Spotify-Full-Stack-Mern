import express from "express";

import { isLoggedIn } from "../middlewares/AuthValidator.js";

import { search, stream, ytSearch } from "../controllers/YoutubeController.js";

const router = express.Router();

router.get("/search", search);
router.get("/ytsearch", ytSearch);
router.get("/stream", stream);

export default router;