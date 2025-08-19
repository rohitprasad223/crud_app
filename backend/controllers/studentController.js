const Student = require("../models/studentModel");

exports.getStudents = async (req, res) => {
  const result = await Student.getAll();
  res.json(result.rows);
};

exports.createStudent = async (req, res) => {
  const result = await Student.create(req.body);
  res.json(result.rows[0]);
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const result = await Student.update(id, req.body);
  res.json(result.rows[0]);
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.delete(id);
  res.sendStatus(204);
};
