const pool = require("../config/db");

const Student = {
  getAll: async () => {
    return await pool.query("SELECT * FROM students ORDER BY id DESC");
  },

  getById: async (id) => {
    return await pool.query("SELECT * FROM students WHERE id=$1", [id]);
  },

  create: async (data) => {
    const { first_name, last_name, dob, mobile, address } = data;
    return await pool.query(
      "INSERT INTO students (first_name, last_name, dob, mobile, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, dob, mobile, address]
    );
  },

  update: async (id, data) => {
    const { first_name, last_name, dob, mobile, address } = data;
    return await pool.query(
      "UPDATE students SET first_name=$1, last_name=$2, dob=$3, mobile=$4, address=$5 WHERE id=$6 RETURNING *",
      [first_name, last_name, dob, mobile, address, id]
    );
  },

  delete: async (id) => {
    return await pool.query("DELETE FROM students WHERE id=$1", [id]);
  },
};

module.exports = Student;
