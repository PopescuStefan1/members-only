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

async function updateMembershipStatus(id, membershipStatus) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [membershipStatus, id]);
}

async function createMessage(title, text, date, id) {
  await pool.query("INSERT INTO posts (title, text, date, user_id) VALUES ($1, $2, $3, $4)", [title, text, date, id]);
}

export default { signUp, getUserDetails, updateMembershipStatus, createMessage };
