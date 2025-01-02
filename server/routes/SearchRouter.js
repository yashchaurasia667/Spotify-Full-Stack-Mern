import express from "express";

import { getToken } from "../controllers/SearchController.js";

const router = express.Router();

router.get("/gettoken", getToken);

export default router;