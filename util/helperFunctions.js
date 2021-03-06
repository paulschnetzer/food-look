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
export function deletesDublications(mainIng) {
  const uniq = {};
  return mainIng.filter((ing) => !uniq[ing.name] && (uniq[ing.name] = true));
}

export function handleDelete(id, userIngArray) {
  const newUserIngArray = [...userIngArray];
  return newUserIngArray.filter((deletedIng) => deletedIng.id !== id);
}

export function getSuggestions(value, ingArray) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const ingNameList = ingArray.map((ing) => ing.name);
  return ingNameList.filter(
    (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue,
  );
}

export function getDate() {
  return new Date().toLocaleDateString('UTC', {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
  });
}

export function isRecipeSaved(userRecipes, recipeId) {
  const savedRecipeIds = userRecipes.map((userRecipe) => userRecipe.recipe_id);
  return savedRecipeIds.includes(parseInt(recipeId));
}

export function handleDelteState(recipe_id, userRecipes) {
  return userRecipes.filter((recipe) => recipe.recipe_id !== recipe_id);
}

export function indexReducer(recipes) {
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

export function dynamicPageReducer(recipes) {
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
