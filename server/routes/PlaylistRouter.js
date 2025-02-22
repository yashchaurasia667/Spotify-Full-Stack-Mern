import express from "express";
import multer from "multer";

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { addToPlaylist, createPlaylist, deletePlaylist, editPlaylist, getPlaylistDetails } from "../controllers/PlaylistController.js";

const router = express.Router();

router.get("/create", isLoggedIn, createPlaylist);
router.get("/getplaylist", isLoggedIn, getPlaylistDetails);
router.post("/edit", isLoggedIn, multer({ dest: "uploads/playlists/" }).single("cover"), editPlaylist);
router.get("/delete", isLoggedIn, deletePlaylist);
router.get("/addtoplaylist", isLoggedIn, addToPlaylist);

export default router;