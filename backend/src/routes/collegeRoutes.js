import express from "express";
import {
  addCollege,
  getColleges,
  filterColleges,
  updateCollege,
  deleteCollege
} from "../controllers/collegeController.js";

const router = express.Router();


router.post("/", addCollege);
router.get("/", getColleges);
router.get("/filter", filterColleges);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);

export default router;