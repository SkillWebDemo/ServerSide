require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = new Client({
  host: 'localhost',
  user: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'node_demo',
  port: 5433,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results.rows);
  });
});

// Get a user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) throw err;
    res.json(results.rows[0]);
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User added successfully', id: result.rows[0].id });
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (err) => {
    if (err) throw err;
    res.json({ message: 'User updated successfully' });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = $1', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
