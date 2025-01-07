import express from "express";

import { callback, getToken, login, search } from "../controllers/SpotifyController.js";

const router = express.Router();

router.get("/gettoken", getToken);
router.get("/login", login);
router.get("/callback", callback);
router.get("/search", search);

export default router;