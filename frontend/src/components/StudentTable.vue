<template>
  <div class="student-table-wrapper">
    <!-- Search bar -->
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="🔍 Search by first name, last name, or address"
        class="search-box"
        @input="onSearch"
      />
    </div>

    <!-- Table -->
    <table class="student-table">
      <thead>
        <tr>
          <th @click="sortBy('first_name')">
            First
            <span v-if="sortKey === 'first_name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="sortBy('last_name')">
            Last
            <span v-if="sortKey === 'last_name'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="sortBy('dob')">
            DOB
            <span v-if="sortKey === 'dob'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in paginatedStudents" :key="student.id">
          <td>{{ student.first_name }}</td>
          <td>{{ student.last_name }}</td>
          <td>{{ formatDate(student.dob) }}</td>
          <td>{{ student.mobile }}</td>
          <td>{{ student.address }}</td>
          <td>
            <button class="edit-btn" @click="$emit('edit', student)">✏️ Edit</button>
            <button class="delete-btn" @click="confirmDelete(student.id)">🗑 Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--" class="page-btn">⏮ Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-btn">Next ⏭</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  students: Array
});

const emit = defineEmits(["edit", "delete", "search"]);

// Search and pagination
const searchQuery = ref("");
const currentPage = ref(1);
const perPage = 5;

// Sorting
const sortKey = ref("");
const sortOrder = ref("asc");

// Filtered students locally
const filteredStudents = computed(() => {
  if (!searchQuery.value) return props.students;
  const query = searchQuery.value.toLowerCase();
  return props.students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.address.toLowerCase().includes(query)
  );
});

// Sorting
const sortedStudents = computed(() => {
  if (!sortKey.value) return filteredStudents.value;
  return [...filteredStudents.value].sort((a, b) => {
    let valA = a[sortKey.value] ?? "";
    let valB = b[sortKey.value] ?? "";
    if (sortKey.value === "dob") {
      valA = new Date(valA);
      valB = new Date(valB);
    } else {
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
    }
    if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
    return 0;
  });
});

// Pagination
const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedStudents.value.length / perPage))
);
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return sortedStudents.value.slice(start, start + perPage);
});

// Reset page on search
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Sorting function
const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

// Emit delete
const confirmDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    emit("delete", id);
  }
};

// API search hook
const onSearch = () => {
  emit("search", searchQuery.value);
};

// Format date
const formatDate = (isoDate) => (isoDate ? isoDate.split("T")[0] : "");
</script>

<style scoped>
.student-table-wrapper {
  margin-top: 20px;
}

.search-wrapper {
  margin-bottom: 10px;
}

.search-box {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
}

.student-table th,
.student-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.student-table th {
  background: #f8f9fa;
  cursor: pointer;
}

.edit-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.page-btn {
  background: #333;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.page-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
