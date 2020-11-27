import { isRecipeSaved } from '../helperFunctions';

//TEST 1 (checks if one User already saved a recipe)
//Setup
const userRecipes = [
  {
    img: 'imagelink',
    name: 'Carbonara',
    recipe_id: 1,
    user_id: 10,
  },
  {
    img: 'imagelink2',
    name: 'Shakshuka',
    recipe_id: 3,
    user_id: 10,
  },
];

//test

test('simplifing the Array', () => {
  const recipeStatus1 = isRecipeSaved(userRecipes, '2');
  expect(recipeStatus1).toBe(false);
  const recipeStatus2 = isRecipeSaved(userRecipes, '1');
  expect(recipeStatus2).toBe(true);
  const recipeStatus3 = isRecipeSaved([], '1');
  expect(recipeStatus3).toBe(false);
});
