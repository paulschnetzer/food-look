import { sql } from './process-env';
import dotenv from 'dotenv';
import setPostgresDefaultsOnHeroku from '../util/setPostgresDefaultsOnHeroku';
setPostgresDefaultsOnHeroku();
dotenv.config();

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
