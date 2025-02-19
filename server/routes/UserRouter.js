import express from "express"
import multer from "multer"

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { editProfile, checkUser, linkSpotify, getUserPlaylists, getPlaylistDetails, getCurrentUser, getUser } from "../controllers/UserController.js"

const router = express.Router();

router.post("/checkuser", checkUser);

router.get("/getcurrentuser", isLoggedIn, getCurrentUser);
router.post("/editprofile", isLoggedIn, multer({ dest: "uploads/" }).single("profile"), editProfile);
router.get("/getuser", isLoggedIn, getUser);

router.post("/linkspotify", isLoggedIn, linkSpotify);

router.get("/getuserplaylists", isLoggedIn, getUserPlaylists);
router.get("/getplaylist", isLoggedIn, getPlaylistDetails);

export default router;