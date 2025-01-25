import express from "express"
import multer from "multer"

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { editProfile, getUser, checkUser, linkSpotify, createPlaylist } from "../controllers/UserController.js"

const router = express.Router();

router.post("/checkuser", checkUser);
router.get("/getuser", isLoggedIn, getUser);
router.post("/linkspotify", isLoggedIn, linkSpotify);
router.post("/editprofile", isLoggedIn, multer({ dest: "uploads/" }).single("profile"), editProfile);
router.get("/createplaylist", isLoggedIn, createPlaylist);

export default router;