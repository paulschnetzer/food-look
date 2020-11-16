import { sql } from './process-env';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import setPostgresDefaultsOnHeroku from '../util/setPostgresDefaultsOnHeroku';
setPostgresDefaultsOnHeroku();
dotenv.config();

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

export async function insertSession(token, userId) {
  const sessions = await sql`
   INSERT INTO sessions
   (token, user_id)
   VALUES
   (${token}, ${userId})
   RETURNING *;`;
  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function getSessionByToken(token) {
  const sessions = await sql`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteSessionByToken(token) {
  if (typeof token === 'undefined') return;
  await sql`
    DELETE FROM sessions WHERE token = ${token};
  `;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

export async function getUserBySessionToken(token) {
  if (typeof token === 'undefined') return undefined;

  const users = await sql`
    SELECT
      users.id,
      users.user_name,
      users.user_role_id
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;
  return users.map((u) => camelcaseKeys(u))[0];
}

export async function insertUserRecipe(recipeId, userId) {
  const sessions = await sql`
   INSERT INTO user_recipe
   (recipe_id, users_id)
   VALUES
   (${recipeId}, ${userId})
   RETURNING *;`;
  return sessions.map((s) => camelcaseKeys(s));
}
export async function getUserRecipe(userId) {
  const users = await sql`
    SELECT
    recipes.id as recipe_id,
    recipes.name,
    recipes.img,
    users.id as user_id
    FROM
      users,
      user_recipe,
      recipes
    WHERE
    users.id = ${userId} AND
    users.id = user_recipe.users_id AND
    recipes.id= user_recipe.recipe_id;
  `;
  return users;
}
export async function deleteUserRecipe(recipeId, userId) {
  const deletedRecipe = await sql`
   DELETE FROM user_recipe
   WHERE recipe_id =${recipeId} AND
   users_id =${userId}
   RETURNING *;`;
  return deletedRecipe.map((s) => camelcaseKeys(s));
}
