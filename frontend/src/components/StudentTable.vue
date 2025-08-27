<template>
  <table>
    <thead>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>DOB</th>
        <th>Mobile</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.first_name }}</td>
        <td>{{ student.last_name }}</td>
        <td>{{ formatDate(student.dob) }}</td>
        <td>{{ student.mobile }}</td>
        <td>{{ student.address }}</td>
        <td>
          <button class="edit-btn" @click="$emit('edit', student)">Edit</button>
          <button class="delete-btn" @click="confirmDelete(student.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  students: Array
});

const emit = defineEmits(['edit', 'delete']);

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  return isoDate.split('T')[0];
};

const confirmDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    emit('delete', id);
  }
};
</script>

