import pool from "./pool.js";

async function signUp(email, password, firstName, lastName) {
  await pool.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [
    email,
    password,
    firstName,
    lastName,
  ]);
}

export default { signUp };
