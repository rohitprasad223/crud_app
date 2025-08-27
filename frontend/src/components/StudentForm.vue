<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.first_name" placeholder="First Name" />
    <span class="error" v-if="errors.first_name">{{ errors.first_name }}</span>

    <input v-model="form.last_name" placeholder="Last Name" />
    <span class="error" v-if="errors.last_name">{{ errors.last_name }}</span>

    <input v-model="form.dob" type="date" />
    <span class="error" v-if="errors.dob">{{ errors.dob }}</span>

    <input v-model="form.mobile" placeholder="Mobile Number" />
    <span class="error" v-if="errors.mobile">{{ errors.mobile }}</span>

    <input v-model="form.address" placeholder="Address" />
    <span class="error" v-if="errors.address">{{ errors.address }}</span>

    <button type="submit">{{ isEdit ? "Update" : "Submit" }}</button>
    <button v-if="isEdit" type="button" @click="onCancel">Cancel</button>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  onSave: { type: Function, required: true },
  editingStudent: { type: Object, default: null },
  onCancelEdit: { type: Function, default: null },
  existingStudents: { type: Array, default: () => [] }
});

const form = ref({
  first_name: "",
  last_name: "",
  dob: "",
  mobile: "",
  address: ""
});

const errors = ref({});
const isEdit = ref(false);

watch(
  () => props.editingStudent,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
      if (form.value.dob) form.value.dob = form.value.dob.split("T")[0];
      isEdit.value = true;
    }
  },
  { immediate: true }
);

const validateForm = () => {
  errors.value = {};

  if (!form.value.first_name) errors.value.first_name = "First name required";
  if (!form.value.last_name) errors.value.last_name = "Last name required";
  if (!form.value.dob) errors.value.dob = "DOB required";

  if (!form.value.mobile) {
    errors.value.mobile = "Mobile required";
  } else if (!/^\d{10}$/.test(form.value.mobile)) {
    errors.value.mobile = "Mobile must be 10 digits";
  } else {
    const exists = props.existingStudents.find(
      s => s.mobile === form.value.mobile && s.id !== form.value.id
    );
    if (exists) errors.value.mobile = "Mobile number already exists";
  }

  if (!form.value.address) errors.value.address = "Address required";

  return Object.keys(errors.value).length === 0;
};

const onSubmit = () => {
  if (!validateForm()) return;
  props.onSave(form.value, isEdit.value);
  resetForm();
};

const onCancel = () => {
  resetForm();
  if (props.onCancelEdit) props.onCancelEdit();
};

const resetForm = () => {
  form.value = { first_name: "", last_name: "", dob: "", mobile: "", address: "" };
  isEdit.value = false;
  errors.value = {};
};
</script>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

form input {
  flex: 1 1 45%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

form input[type="date"] {
  flex: 1 1 100%;
}

form button {
  padding: 15px 80px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button[type="button"] {
  background-color: red;
}

.error {
  flex: 1 1 100%;
  color: red;
  font-size: 0.9em;
}
</style>
