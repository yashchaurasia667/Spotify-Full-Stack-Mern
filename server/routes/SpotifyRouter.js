import express from "express";

import { isLoggedIn } from "../middlewares/AuthValidator.js";
import { callback, checkTokenValidity, getToken, getTrack, login, playlists, refreshToken, search } from "../controllers/SpotifyController.js";

const router = express.Router();

router.get("/checktokenvalidity", isLoggedIn, checkTokenValidity);
router.get("/gettoken", isLoggedIn, getToken);
router.get("/login", isLoggedIn, login);
router.get("/callback", isLoggedIn, callback);
router.get("/refreshtoken", isLoggedIn, refreshToken);
router.get("/search", isLoggedIn, search);
router.get("/playlists", isLoggedIn, playlists);
router.get("/track", isLoggedIn, getTrack);

export default router;