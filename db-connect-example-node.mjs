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

let x = food.reduce((reducedFoodArray, recipeIng) => {
  let matchingRecipe = reducedFoodArray.find(
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

console.log(x);

sql.end();
