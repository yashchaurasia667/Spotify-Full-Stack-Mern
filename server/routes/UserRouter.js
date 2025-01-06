import express from "express"
import multer from "multer"

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { editProfile, getUser, checkUser, linkSpotify } from "../controllers/UserController.js"

const router = express.Router();

router.post("/checkuser", checkUser);
router.post("/getuser", isLoggedIn, getUser);
router.post("/linkspotify", isLoggedIn, linkSpotify);
router.post("/editprofile", isLoggedIn, multer({ dest: "uploads/" }).single("profile"), editProfile);

export default router;