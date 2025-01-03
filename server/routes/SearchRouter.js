import express from "express";

import { callback, getToken, login } from "../controllers/SearchController.js";

const router = express.Router();

router.get("/gettoken", getToken);
router.get("/login", login);
router.get("/callback", callback);

export default router;