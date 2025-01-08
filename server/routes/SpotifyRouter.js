import express from "express";

import { callback, checkTokenValidity, getToken, login, refreshToken, search } from "../controllers/SpotifyController.js";

const router = express.Router();

router.get("/checktokenvalidity", checkTokenValidity);
router.get("/gettoken", getToken);
router.get("/login", login);
router.get("/callback", callback);
router.get("/getrefreshtoken", refreshToken);
router.post("/search", search);

export default router;