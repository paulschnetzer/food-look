export function findMatchingObjectBasedOnName(arrayOne, arrayTwo) {
  return arrayOne.filter((item1) =>
    arrayTwo.some((item2) => item2.name === item1.name),
  );
}

export function transformTheIngArray(actualarray) {
  return actualarray.map((item1) => item1.ing);
}

export function findMatchingObjectBasedOnIng(arrayOne, arrayTwo) {
  return arrayOne.filter((item1) =>
    arrayTwo.every((item2) => item1.ing.includes(item2)),
  );
}

// let x=foodArray.reduce((reducedFoodArray, recipeIng)=>{

//   let matchingRecipe= reducedFoodArray.find((ing) =>
//    (ing.name===recipeIng.recipe_name))
//   if(!matchingRecipe){
//   // delete recipeIng.ingredient_id;
//   // recipeIng.ingredient_name=[recipeIng.ingredient_name]
//   reducedFoodArray.push({id:recipeIng.recipe_id, name:recipeIng.recipe_name, img:recipeIng.recipe_img, link:recipeIng.recipe_link, ingredients:[recipeIng.ingredient_name]})
//   }else{
//    matchingRecipe.ingredients.push(recipeIng.ingredient_name)
//   }
//   return reducedFoodArray
// },[])
