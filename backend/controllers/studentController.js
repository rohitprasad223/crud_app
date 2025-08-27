const Student = require("../models/studentModel");
const { validationResult } = require("express-validator");

exports.getStudents = async (req, res) => {
  try {
    const result = await Student.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.getById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

exports.createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await Student.create(req.body);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create student" });
  }
};

exports.updateStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const result = await Student.update(id, req.body);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update student" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.delete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};
