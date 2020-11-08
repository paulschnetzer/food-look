import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';

dotenv.config();
const sql = postgres();

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
