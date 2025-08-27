const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentById);

router.post(
  "/",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("dob").isDate().withMessage("Date of birth must be valid"),
    body("mobile")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile must be 10 digits"),
    body("address").notEmpty().withMessage("Address is required"),
  ],
  studentController.createStudent
);

router.put(
  "/:id",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("dob").isDate().withMessage("Date of birth must be valid"),
    body("mobile")
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile must be 10 digits"),
    body("address").notEmpty().withMessage("Address is required"),
  ],
  studentController.updateStudent
);

router.delete("/:id", studentController.deleteStudent);

module.exports = router;
