import postgres from 'postgres';
import dotenv from 'dotenv';
import camelcaseKeys from 'camelcase-keys';
import setPostgresDefaultsOnHeroku from '../util/setPostgresDefaultsOnHeroku';
setPostgresDefaultsOnHeroku();
dotenv.config();
const sql =
  process.env.NODE_ENV === 'production'
    ? postgres({ ssl: { rejectUnauthorized: false } })
    : postgres({
        idle_timeout: 5,
      });

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
