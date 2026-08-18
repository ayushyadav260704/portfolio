import express from "express";

import { createProject, deleteProject, getProjects } from "../controllers/projectControllers.js";

const router = express.Router();

router.route("/")
  .get(getProjects)
  .post(createProject);

router.route("/:id")
   .delete(deleteProject);

export default router;