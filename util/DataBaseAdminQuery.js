import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();
const sql = postgres();

export async function insertRecipeName(name, link, img) {
  const recipe = await sql`
   INSERT INTO sessions
   (token, user_id)
   VALUES
   (${token}, ${userId})
   RETURNING *;`;
  return recipeName.map((s) => camelcaseKeys(s))[0];
}
