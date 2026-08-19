import express from "express";
import {  submitContactMessage } from "../controllers/contactControllers.js";

const router = express.Router();

router.route("/")
   .post(submitContactMessage);

export default router;
