import {
  insertRecipeName,
  insertIngredient,
  insertJoinedTable,
  getIngredients,
} from '../../util/database';

function changedArray(arr, obj, arr2) {
  const newingredients = [...arr];
  const addRecipeId = newingredients.filter(
    (item1) => (item1.recipe_id = obj.id),
  );
  const changeKeyName = addRecipeId.filter(
    (item1) => (item1['ingredient_id'] = item1['id']),
  );
  const deleteOldKeyName = changeKeyName.filter((item1) => delete item1.id);
  const addedStatus = deleteOldKeyName.filter((item1) =>
    arr2.filter((item2) =>
      item1.name === item2.name ? (item1.status = item2.mainIng) : item1.name,
    ),
  );

  const changeKeyName2 = addedStatus.filter(
    (item1) => (item1['ingredient_type_id'] = item1['status']),
  );

  const deleteOldKeyName2 = changeKeyName.filter(
    (item1) => delete item1.status,
  );
  const deleteOldKeyName3 = deleteOldKeyName2.filter(
    (item1) => delete item1.name,
  );
  const modifyKeyValue = deleteOldKeyName3.filter((item1) =>
    item1.ingredient_type_id === false
      ? (item1.ingredient_type_id = 2)
      : (item1.ingredient_type_id = 1),
  );
  return modifyKeyValue;
}
export default async function handler(request, response) {
  const { name, link, img, ingredients } = request.body;

  try {
    const recipeobject = await insertRecipeName(name, link, img);
    const allIngFromDatabase = await getIngredients();
    const ingAleadyExistInDB = allIngFromDatabase.filter((item1) =>
      ingredients.find((item2) => item2.name === item1.name),
    );
    // let ingToInsertInDB = null;

    if (ingAleadyExistInDB.length !== ingredients.length) {
      const ingToInsertInDB = ingredients.filter((item1) =>
        ingAleadyExistInDB.every((item2) => item2.name !== item1.name),
      );
      const ingArray = await insertIngredient(ingToInsertInDB);
      const allIng = ingArray.concat(ingAleadyExistInDB);
      const arrayForJoinedTable = changedArray(
        allIng,
        recipeobject,
        ingredients,
      );
      await insertJoinedTable(arrayForJoinedTable);
    } else {
      const arrayForJoinedTable = changedArray(
        ingAleadyExistInDB,
        recipeobject,
        ingredients,
      );
      await insertJoinedTable(arrayForJoinedTable);
    }
  } catch (err) {
    return response.status(500).send({ success: false });
  }
  response.send({ success: true });
}
// let ingarrayPlusRecipeId = ingarray.filter(
//   (item1) => (item1.recipe_id = recipeobject.id),
// );
// let renamedingarrayPlusRecipeId = ingarrayPlusRecipeId.filter(
//   (item1) => (item1['ingredient_id'] = item1['id']),
// );
// function changedArray(arr, obj, ingPlusStatus) {
//   const newingredients = [...arr];
//   const addRecipeId = newingredients.filter(
//     (item1) => (item1.recipe_id = obj.id),
//   );
//   const changeKeyName = addRecipeId.filter(
//     (item1) => (item1['ingredient_id'] = item1['id']),
//   );
//   const deleteOldKeyName = changeKeyName.filter((item1) => delete item1.id);

//   return deleteOldKeyName;
// }
// French Toast
// https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80

// https://www.simplyrecipes.com/recipes/french_toast/
// egg;
// milk;
// cinnamon;
// bread;
// butter;
// Maple syrup
