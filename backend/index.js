const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crud_app',
  password: '123456789',
  port: 5432,
});

app.get('/api/students', async (req, res) => {
  const result = await pool.query('SELECT * FROM students ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/api/students', async (req, res) => {
  const { first_name, last_name, dob, mobile, address } = req.body;
  const result = await pool.query(
    'INSERT INTO students (first_name, last_name, dob, mobile, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [first_name, last_name, dob, mobile, address]
  );
  res.json(result.rows[0]);
});

app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, dob, mobile, address } = req.body;
  const result = await pool.query(
    'UPDATE students SET first_name=$1, last_name=$2, dob=$3, mobile=$4, address=$5 WHERE id=$6 RETURNING *',
    [first_name, last_name, dob, mobile, address, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM students WHERE id=$1', [id]);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
