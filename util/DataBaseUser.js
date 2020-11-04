import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();
const sql = postgres();

export async function registerUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (user_name, password_hash, user_role_id)
    VALUES
      (${username}, ${passwordHash}, 2)
    RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT * FROM users WHERE user_name = ${username};
  `;
  return users.map((u) => camelcaseKeys(u))[0];
}
