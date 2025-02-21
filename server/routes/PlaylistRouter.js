import express from "express";
import multer from "multer";

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { createPlaylist, deletePlaylist, editPlaylist, getPlaylistDetails } from "../controllers/PlaylistController.js";

const router = express.Router();

router.get("/create", isLoggedIn, createPlaylist);
router.get("/getplaylist", isLoggedIn, getPlaylistDetails);
router.post("/edit", multer({ dest: "uploads/playlists/" }).single("cover"), editPlaylist);
router.post("/delete", deletePlaylist);

export default router;