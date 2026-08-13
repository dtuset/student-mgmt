const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query);
    res.status(200).json({students});
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const newStudent = await addNewStudent(req.body);
    res.status(201).json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const payload = { ...req.body, userId: req.params.id };
    const updatedStudent = await updateStudent(payload);
    res.status(200).json(updatedStudent);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const updatedStudent = await setStudentStatus({ userId: req.params.id, reviewerId: req.user.id, status: req.body.status });
    res.status(200).json(updatedStudent);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const result = await deleteStudent(req.params.id);
    res.status(200).json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent,
};
