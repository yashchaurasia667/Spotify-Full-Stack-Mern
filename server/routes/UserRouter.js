import express from "express"
import multer from "multer"

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { editProfile, checkUser, linkSpotify, createPlaylist, getUserPlaylists, getPlaylistDetails, getCurrentUser, getUser } from "../controllers/UserController.js"

const router = express.Router();

router.post("/checkuser", checkUser);
router.get("/getcurrentuser", isLoggedIn, getCurrentUser);
router.get("/getuser", isLoggedIn, getUser);
router.post("/linkspotify", isLoggedIn, linkSpotify);
router.post("/editprofile", isLoggedIn, multer({ dest: "uploads/" }).single("profile"), editProfile);
router.get("/createplaylist", isLoggedIn, createPlaylist);
router.get("/getuserplaylists", isLoggedIn, getUserPlaylists);
router.get("/getplaylist", isLoggedIn, getPlaylistDetails);

export default router;