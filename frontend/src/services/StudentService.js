import axios from "axios";

const API_URL = "http://localhost:3000/api/students";

// API search: pass query param
export const getStudents = (searchQuery = "") =>
  axios.get(API_URL, { params: { q: searchQuery } });

export const addStudent = (data) => axios.post(API_URL, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteStudentById = (id) => axios.delete(`${API_URL}/${id}`);
