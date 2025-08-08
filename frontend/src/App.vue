<template>
  <div class="container">
    <h1>Student Form</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.first_name" placeholder="First Name" required />
      <input v-model="form.last_name" placeholder="Last Name" required />
      <input v-model="form.dob" type="date" required />
      <input v-model="form.mobile" placeholder="Mobile Number" required />
      <input v-model="form.address" placeholder="Address" required />
      <button type="submit">{{ isEdit ? "Update" : "Submit" }}</button>
    </form>

    <h2>Student Table</h2>
    <table>
      <thead>
        <tr>
          <th>First</th><th>Last</th><th>DOB</th><th>Mobile</th><th>Address</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.first_name }}</td>
          <td>{{ student.last_name }}</td>
          <td>{{ student.dob }}</td>
          <td>{{ student.mobile }}</td>
          <td>{{ student.address }}</td>
          <td>
            <button class="edit-btn" @click="editStudent(student)">Edit</button>
            <button class="delete-btn" @click="deleteStudent(student.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const form = ref({
  first_name: '',
  last_name: '',
  dob: '',
  mobile: '',
  address: ''
})

const students = ref([])
const isEdit = ref(false)
let editingId = null

const fetchStudents = async () => {
  const res = await axios.get('http://localhost:3000/api/students')
  students.value = res.data
}

onMounted(fetchStudents)

const handleSubmit = async () => {
  if (isEdit.value) {
    await axios.put(`http://localhost:3000/api/students/${editingId}`, form.value)
    isEdit.value = false
    editingId = null
  } else {
    await axios.post('http://localhost:3000/api/students', form.value)
  }
  form.value = { first_name: '', last_name: '', dob: '', mobile: '', address: '' }
  fetchStudents()
}

const editStudent = (student) => {
  form.value = { ...student }
  isEdit.value = true
  editingId = student.id
}

const deleteStudent = async (id) => {
  await axios.delete(`http://localhost:3000/api/students/${id}`)
  fetchStudents()
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f0f2f5;
}

.container {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

h1, h2 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

form input {
  flex: 1 1 45%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form input[type="date"] {
  flex: 1 1 100%;
}

form button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

form button:hover {
  background-color: #36976e;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.edit-btn {
  background-color: #2196f3;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #1976d2;
}

.delete-btn {
  background-color: #e53935;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-left: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c62828;
}
</style>
