// import { isRecipeSaved } from '../helperFunctions';

// recipes.reduce((reducedFoodArray, recipeIng) => {
//   const matchingRecipe = reducedFoodArray.find(
//     (ing) => ing.name === recipeIng.recipe_name,
//   );
//   if (!matchingRecipe) {
//     reducedFoodArray.push({
//       id: recipeIng.recipe_id,
//       name: recipeIng.recipe_name,
//       image: recipeIng.recipe_img,
//       link: recipeIng.recipe_link,
//       ing: [recipeIng.ingredient_name],
//     });
//   } else {
//     matchingRecipe.ing.push(recipeIng.ingredient_name);
//   }
//   return reducedFoodArray;
// }, []);
