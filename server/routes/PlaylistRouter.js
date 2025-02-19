import express from "express";
import multer from "multer";

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { createPlaylist, editPlaylist } from "../controllers/PlaylistController.js";

const router = express.Router();

router.get("/createplaylist", isLoggedIn, createPlaylist);
router.post("/editplaylist", multer({ dest: "uploads/playlists/" }).single("cover"), editPlaylist);

export default router;