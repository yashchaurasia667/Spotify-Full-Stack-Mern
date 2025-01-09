import express from "express";

import { callback, checkTokenValidity, getToken, login, playlists, refreshToken, search } from "../controllers/SpotifyController.js";

const router = express.Router();

router.get("/checktokenvalidity", checkTokenValidity);
router.get("/gettoken", getToken);
router.get("/login", login);
router.get("/callback", callback);
router.get("/refreshtoken", refreshToken);
router.post("/search", search);
router.get("/playlists", playlists);

export default router;