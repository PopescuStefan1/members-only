#! /usr/bin/env node

import pkg from "pg";
const { Client } = pkg;

const SQL = `
CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    membership_status BOOLEAN DEFAULT FALSE,is_admin BOOLEAN DEFAULT false
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://<role_name>:<role_password>@<host>:<port>/<database>`, // Add your role_name, role_password, host, port and database here
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
