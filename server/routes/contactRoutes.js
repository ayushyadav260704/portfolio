import express from "express";
import { getContactMessages, submitContactMessage } from "../controllers/contactControllers.js";

const router = express.Router();

router.route("/")
   .post(submitContactMessage)
   .get(getContactMessages);

export default router;
