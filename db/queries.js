import pool from "./pool.js";

async function signUp(email, password, firstName, lastName, isAdmin) {
  await pool.query("INSERT INTO users (email, password, first_name, last_name, is_admin) VALUES ($1, $2, $3, $4, $5)", [
    email,
    password,
    firstName,
    lastName,
    isAdmin,
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

async function getMessages() {
  const { rows } = await pool.query(`
    SELECT 
      posts.id AS post_id,
      posts.title,
      posts.text,
      posts.date,
      users.id AS user_id,
      users.first_name,
      users.last_name
    FROM posts
    JOIN users ON posts.user_id = users.id;
  `);
  return rows;
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
}

export default { signUp, getUserDetails, updateMembershipStatus, createMessage, getMessages, deleteMessage };
