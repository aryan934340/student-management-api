const express = require("express");
const router = express.Router();
const students = require("../data/students");

// Helper: validate student fields
// partial = true allows only some fields (used for PUT updates)
const validateStudent = (body, partial = false) => {
  const errors = [];
  const { name, course, age } = body;

  if (!partial || name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("name is required and must be a non-empty string");
    }
  }
  if (!partial || course !== undefined) {
    if (typeof course !== "string" || course.trim() === "") {
      errors.push("course is required and must be a non-empty string");
    }
  }
  if (age !== undefined) {
    if (!Number.isInteger(age) || age <= 0) {
      errors.push("age must be a positive integer");
    }
  }
  return errors;
};

// Helper: parse and validate :id param
const parseId = (id) => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

// GET /students -> get all students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// GET /students/:id -> get one student
router.get("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }

  res.status(200).json({ success: true, data: student });
});

// POST /students -> create a student
router.post("/", (req, res) => {
  const errors = validateStudent(req.body || {});
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Invalid input", errors });
  }

  const { name, course, age } = req.body;
  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = { id: newId, name: name.trim(), course: course.trim() };
  if (age !== undefined) newStudent.age = age;

  students.push(newStudent);
  res.status(201).json({ success: true, message: "Student created", data: newStudent });
});

// PUT /students/:id -> update a student
router.put("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }

  const body = req.body || {};
  const { name, course, age } = body;
  if (name === undefined && course === undefined && age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update: name, course, age",
    });
  }

  const errors = validateStudent(body, true);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Invalid input", errors });
  }

  if (name !== undefined) student.name = name.trim();
  if (course !== undefined) student.course = course.trim();
  if (age !== undefined) student.age = age;

  res.status(200).json({ success: true, message: "Student updated", data: student });
});

// DELETE /students/:id -> delete a student
router.delete("/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ success: false, message: "Invalid student ID" });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }

  const [deleted] = students.splice(index, 1);
  res.status(200).json({ success: true, message: "Student deleted", data: deleted });
});

module.exports = router;
