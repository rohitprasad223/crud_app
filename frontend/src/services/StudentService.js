import axios from "axios";

const API_URL = "http://localhost:3000/api/students";

export const getStudents = () => axios.get(API_URL);
export const addStudent = (data) => axios.post(API_URL, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteStudentById = (id) => axios.delete(`${API_URL}/${id}`);
