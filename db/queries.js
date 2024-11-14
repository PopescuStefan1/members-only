import pool from "./pool.js";

async function signUp(email, password, firstName, lastName) {
  await pool.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
    email,
    password,
    firstName,
    lastName,
  ]);
}

async function getUserDetails(id) {
  const { rows } = await pool.query("SELECT (email, first_name, last_name) FROM USERS WHERE id = $1", [id]);
  return rows[0] || null;
}

export default { signUp, getUserDetails };
