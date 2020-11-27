import { handleDelteState } from '../helperFunctions';

//TEST 1 (deletes an Element from List)
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

test('deleting an Obejct based on id', () => {
  const newArray1 = handleDelteState(1, userRecipes);
  expect(newArray1.length).toBe(1);
  expect(newArray1).toEqual([userRecipes[1]]);
  const newArray2 = handleDelteState(2, userRecipes);
  expect(newArray2.length).toBe(2);
  expect(newArray2).toEqual(userRecipes);
});
