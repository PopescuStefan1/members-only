import pkg from "pg";
const { Pool } = pkg;

export default new Pool({
  user: process.env.USERNAME, // Add your role_name here
  password: process.env.PASSWORD, // Add your role_password to here
  host: process.env.HOST, // Add your host here ("localhost" if running locally)
  database: process.env.DB, // Add your database here ("localhost" if running locally)
  port: process.env.DB_PORT || 5432, // Add your port here
});
