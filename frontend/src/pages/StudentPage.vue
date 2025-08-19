<template>
  <div class="container">
    <h1>*Student Form*</h1>
    <StudentForm
      :onSave="saveStudent"
      :editingStudent="editingStudent"
      :onCancelEdit="cancelEdit"
      :existingStudents="students"
    />

    <h1>*Student Table*</h1>
    <StudentTable
      :students="students"
      @edit="editStudent"
      @delete="deleteStudent"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StudentForm from "../components/StudentForm.vue";
import StudentTable from "../components/StudentTable.vue";
import { getStudents, addStudent, updateStudent, deleteStudentById } from "../services/StudentService"; 

const students = ref([]);
const editingStudent = ref(null);

const fetchStudents = async () => {
  const res = await getStudents();
  students.value = res.data;
};

onMounted(fetchStudents);

const saveStudent = async (data, isEdit) => {
  if (isEdit) {
    await updateStudent(data.id, data);
  } else {
    await addStudent(data);
  }
  editingStudent.value = null;
  fetchStudents();
};

const editStudent = (student) => {
  editingStudent.value = student;
};

const deleteStudent = async (id) => {
  await deleteStudentById(id);
  fetchStudents();
};

const cancelEdit = () => {
  editingStudent.value = null;
};
</script>
