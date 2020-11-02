import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres();

const food = await sql`
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
  recipes_ingredients_types.ingredient_id = ingredients.id;
`;

// let transformedArray = food.filter((x) => x.recipe_id === 1);
let realArray = null;
let transformedArray = food.map((x) => x.recipe_id);

function findMatchingObjectBasedOnIng(arrayOne, arrayTwo) {
  return arrayOne.filter((item1) =>
    arrayTwo.every((item2) => item1.ing.includes(item2)),
  );
}

console.log(transformedArray);

sql.end();
