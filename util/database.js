import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';
setPostgresDefaultsOnHeroku();
dotenv.config();
const sql =
  process.env.NODE_ENV === 'production'
    ? postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({
        idle_timeout: 5,
      });

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

export async function insertRecipeName(name, link, img) {
  const recipe = await sql`
   INSERT INTO recipes
   (img, link, name)
   VALUES
   (${img},${link}, ${name})
   RETURNING id, name;`;
  return recipe.map((s) => camelcaseKeys(s))[0];
}

export async function insertIngredient(ingredients) {
  const ingredient = await sql`
   INSERT INTO ingredients ${sql(ingredients, 'name')}
   RETURNING id, name;`;
  return ingredient;
}

export async function getIngredients() {
  const allingredient = await sql`
    SELECT * FROM ingredients

  `;
  return allingredient;
}

export async function getMainIngredients() {
  const mainIng = await sql`
  SELECT
  ingredients.name as name
FROM
  recipes,
  ingredients,
  ingredient_types,
  recipes_ingredients_types
WHERE
  ingredient_types.name = 'main' AND
  recipes_ingredients_types.ingredient_type_id = ingredient_types.id AND
  recipes_ingredients_types.recipe_id = recipes.id AND
  recipes_ingredients_types.ingredient_id = ingredients.id
  ;
    `;
  return mainIng;
}

export async function insertJoinedTable(pairings) {
  const ingredient = await sql`
   INSERT INTO recipes_ingredients_types ${sql(
     pairings,
     'recipe_id',
     'ingredient_id',
     'ingredient_type_id',
   )}
  RETURNING *;`;
  return ingredient;
}

export async function getRecipesForIndex() {
  const recipes = await sql`
  SELECT
  recipes.id as recipe_id,
  recipes.name as recipe_name,
  recipes.img as recipe_img,
  recipes.link as recipe_link,
  ingredients.id as ingredient_id,
  ingredients.name as ingredient_name
FROM
  recipes,
  ingredients,
  ingredient_types,
  recipes_ingredients_types
WHERE
  ingredient_types.name = 'main' AND
  recipes_ingredients_types.ingredient_type_id = ingredient_types.id AND
  recipes_ingredients_types.recipe_id = recipes.id AND
  recipes_ingredients_types.ingredient_id = ingredients.id
  ;
    `;

  return recipes.reduce((reducedFoodArray, recipeIng) => {
    const matchingRecipe = reducedFoodArray.find(
      (ing) => ing.name === recipeIng.recipe_name,
    );
    if (!matchingRecipe) {
      reducedFoodArray.push({
        id: recipeIng.recipe_id,
        name: recipeIng.recipe_name,
        image: recipeIng.recipe_img,
        link: recipeIng.recipe_link,
        ing: [recipeIng.ingredient_name],
      });
    } else {
      matchingRecipe.ing.push(recipeIng.ingredient_name);
    }
    return reducedFoodArray;
  }, []);
}

export async function getRecipesForProductPage() {
  const recipes = await sql`
  SELECT
  recipes.id as recipe_id,
  recipes.name as recipe_name,
  recipes.img as recipe_img,
  recipes.link as recipe_link,
  ingredients.id as ingredient_id,
  ingredients.name as ingredient_name,
  ingredient_types.id as ingredients_types_id
FROM
  recipes,
  ingredients,
  ingredient_types,
  recipes_ingredients_types

WHERE
(ingredient_types.name = 'spices' OR ingredient_types.name = 'main') AND
  recipes_ingredients_types.ingredient_type_id = ingredient_types.id AND
  recipes_ingredients_types.recipe_id = recipes.id AND
  recipes_ingredients_types.ingredient_id = ingredients.id
  ;
`;

  return recipes.reduce((reducedFoodArray, recipeIng) => {
    const matchingRecipe = reducedFoodArray.find(
      (ing) => ing.name === recipeIng.recipe_name,
    );
    if (!matchingRecipe && recipeIng.ingredients_types_id === 1) {
      reducedFoodArray.push({
        id: recipeIng.recipe_id,
        name: recipeIng.recipe_name,
        img: recipeIng.recipe_img,
        link: recipeIng.recipe_link,
        ingredients: [recipeIng.ingredient_name],
        spices: [],
      });
    } else if (!matchingRecipe && recipeIng.ingredients_types_id === 2) {
      reducedFoodArray.push({
        id: recipeIng.recipe_id,
        name: recipeIng.recipe_name,
        img: recipeIng.recipe_img,
        link: recipeIng.recipe_link,
        ingredients: [],
        spices: [recipeIng.ingredient_name],
      });
    } else if (matchingRecipe && recipeIng.ingredients_types_id === 1) {
      matchingRecipe.ingredients.push(recipeIng.ingredient_name);
    } else if (matchingRecipe && recipeIng.ingredients_types_id === 2) {
      matchingRecipe.spices.push(recipeIng.ingredient_name);
    }
    return reducedFoodArray;
  }, []);
}

export async function deleteRecipeFromJointTable(id) {
  const deletedRecipe = await sql`
  DELETE FROM
recipes_ingredients_types
WHERE
recipes_ingredients_types.recipe_id = ${id}
RETURNING *;`;
  return deletedRecipe.map((s) => camelcaseKeys(s))[0];
}

export async function deleteRecipeFromRecipeTable(id) {
  const deletedRecipe = await sql`
   DELETE FROM
    recipes
      WHERE
    recipes.id = ${id}
    RETURNING *;`;
  return deletedRecipe.map((s) => camelcaseKeys(s))[0];
}

export async function insertComment(comment, recipeId, userId, date) {
  const recipe = await sql`
   INSERT INTO comments
   (comment, recipe_id, user_id, upload_date)
   VALUES
   (${comment},${recipeId}, ${userId},${date})
   RETURNING *;`;
  return recipe.map((s) => camelcaseKeys(s))[0];
}

export async function getComment(recipeId) {
  const users = await sql`
    SELECT
    comments.upload_date,
    users.user_name,
    comments.comment
    FROM
      users,
      recipes,
      comments
    WHERE
    comments.recipe_id = ${recipeId} AND
    comments.recipe_id = recipes.id AND
    users.id=comments.user_id;
  `;
  return users;
}
