import {
  transformTheIngArray,
  findMatchingObjectBasedOnIng,
  deletesDublications,
  handleDelete,
  getSuggestions,
} from '../helperFunctions';
//Global variables
const userIngArray = [
  { ing: 'Apple', id: 1 },
  { ing: 'Garlic', id: 2 },
];
//TEST 1 (simplifing an Array)
//Setup from global Variables
//test

test('simplifing the Array', () => {
  const easierArray = transformTheIngArray(userIngArray);
  expect(easierArray).toEqual(['Apple', 'Garlic']);
});

//TEST 2 (matchingArray)
//Setup
const databaseArray = [
  {
    id: 1,
    image: 'imageLink1',
    ing: ['bacon', 'parmesan', 'egg', 'pasta'],
    link: 'recipeLink1',
    name: '"Carbonara"',
  },
  {
    id: 2,
    image: 'imageLink2',
    ing: ['onion', 'egg', 'canned tomato'],
    link: 'recipeLink2',
    name: 'Shakshuka',
  },
];
const userInputThatHasMatchingIngForBothRecipes = ['egg'];
const userInputThatHasNoMatchingIng = ['candy'];
const userInputThatHasMatchingIngForOneRecipe = ['bacon'];
//test
test('findMatchingRecipe', () => {
  const matchingRecipes1 = findMatchingObjectBasedOnIng(
    databaseArray,
    userInputThatHasMatchingIngForBothRecipes,
  );
  expect(matchingRecipes1.length).toBe(2);
  expect(matchingRecipes1).toEqual(databaseArray);

  const matchingRecipes2 = findMatchingObjectBasedOnIng(
    databaseArray,
    userInputThatHasNoMatchingIng,
  );
  expect(matchingRecipes2.length).toBe(0);
  expect(matchingRecipes2).toEqual([]);

  const matchingRecipes3 = findMatchingObjectBasedOnIng(
    databaseArray,
    userInputThatHasMatchingIngForOneRecipe,
  );
  expect(matchingRecipes3.length).toBe(1);
  expect(matchingRecipes3).toEqual([databaseArray[0]]);
});
//TEST 3 (delete Dublications)
//Setup
const arrayWithDublication = [
  { name: 'parmesan' },
  { name: 'egg' },
  { name: 'parmesan' },
  { name: 'canned tomatos' },
  { name: 'egg' },
];
const arrayWithoutDublication = [
  { name: 'parmesan' },
  { name: 'egg' },
  { name: 'canned tomatos' },
];
//test
test('delete Dublication in the Array', () => {
  const noDublicateArray1 = deletesDublications(arrayWithDublication);
  expect(noDublicateArray1.length).toBe(3);
  expect(noDublicateArray1).toEqual(arrayWithoutDublication);

  const noDublicateArray2 = deletesDublications(arrayWithoutDublication);
  expect(noDublicateArray2.length).toBe(3);
  expect(noDublicateArray2).toEqual(arrayWithoutDublication);
});

//Test 4 (deleteFunction)
//Setup
//Setup from global Variables

//Test
test('delete Object based on Id ', () => {
  const newUserIngArray = handleDelete(1, userIngArray);
  expect(newUserIngArray.length).toBe(1);
  expect(newUserIngArray).toEqual([userIngArray[1]]);
});
//Test 5 (deleteFunction)
//Setup

//Test
test('delete Object based on Id ', () => {
  const newUserIngArray = handleDelete(1, userIngArray);
  expect(newUserIngArray.length).toBe(1);
  expect(newUserIngArray).toEqual([userIngArray[1]]);
});

//TEST (Autocomplete function)
//Setup
const ingArray = [
  { name: 'Apple' },
  { name: 'Almonds' },
  { name: 'Apricots' },
  { name: 'Raisins' },
  { name: 'Goat cheese' },
];
//Test
test('delete Object based on Id ', () => {
  const filteredIng1 = getSuggestions('G', ingArray);
  expect(filteredIng1.length).toBe(1);
  expect(filteredIng1).toEqual([ingArray[4].name]);
  const filteredIng2 = getSuggestions('Ap', ingArray);
  expect(filteredIng2.length).toBe(2);
  expect(filteredIng2).toEqual([ingArray[0].name, ingArray[2].name]);
  const filteredIng3 = getSuggestions('X', ingArray);
  expect(filteredIng3.length).toBe(0);
  expect(filteredIng3).toEqual([]);
});
