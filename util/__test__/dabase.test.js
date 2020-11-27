import { indexReducer, dynamicPageReducer } from '../helperFunctions';
//TEST 1(reducer for indexPage)
//Setup
const indexArrayBeforeReduce = [
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 1,
    ingredient_name: 'bacon',
  },
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 2,
    ingredient_name: 'parmesan',
  },
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 3,
    ingredient_name: 'egg',
  },
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 4,
    ingredient_name: 'pasta',
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 5,
    ingredient_name: 'onion',
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 3,
    ingredient_name: 'egg',
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 6,
    ingredient_name: 'canned tomatos',
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 10,
    ingredient_name: 'minced meat',
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 11,
    ingredient_name: 'beans',
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 5,
    ingredient_name: 'onion',
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 6,
    ingredient_name: 'canned tomatos',
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 5,
    ingredient_name: 'onion',
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 14,
    ingredient_name: 'curry-paste',
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 15,
    ingredient_name: 'coconut milk',
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 16,
    ingredient_name: 'sweet potato',
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 3,
    ingredient_name: 'egg',
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1132,
    ingredient_name: 'milk',
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1134,
    ingredient_name: 'bread',
  },
];
const indexArrayAfterReduce = [
  {
    id: 1,
    name: 'Carbonara',
    image:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ing: ['bacon', 'parmesan', 'egg', 'pasta'],
  },
  {
    id: 2,
    name: 'Shakshuka',
    image:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ing: ['onion', 'egg', 'canned tomatos'],
  },
  {
    id: 3,
    name: 'Chilli con Carne',
    image:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    link: 'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ing: ['minced meat', 'beans', 'onion', 'canned tomatos'],
  },
  {
    id: 4,
    name: 'Sweet Potato Curry',
    image:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    link: 'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ing: ['onion', 'curry-paste', 'coconut milk', 'sweet potato'],
  },
  {
    id: 394,
    name: 'French Toast',
    image:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ing: ['egg', 'milk', 'bread'],
  },
];
//test
test('recuding the Index Array', () => {
  const reducedArray = indexReducer(indexArrayBeforeReduce);
  expect(reducedArray).toEqual(indexArrayAfterReduce);
  expect(reducedArray.length).toBe(5);
});

//TEST 1(reducer for indexPage)
//Setup
const dynamicArrayBeforeReduce = [
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 1,
    ingredient_name: 'bacon',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 2,
    ingredient_name: 'parmesan',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 3,
    ingredient_name: 'egg',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 1,
    recipe_name: 'Carbonara',
    recipe_img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    recipe_link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredient_id: 4,
    ingredient_name: 'pasta',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 5,
    ingredient_name: 'onion',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 3,
    ingredient_name: 'egg',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 6,
    ingredient_name: 'canned tomatos',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 7,
    ingredient_name: 'garlic',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 8,
    ingredient_name: 'cumin',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 2,
    recipe_name: 'Shakshuka',
    recipe_img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    recipe_link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredient_id: 9,
    ingredient_name: 'chilli',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 10,
    ingredient_name: 'minced meat',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 11,
    ingredient_name: 'beans',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 5,
    ingredient_name: 'onion',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 6,
    ingredient_name: 'canned tomatos',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 9,
    ingredient_name: 'chilli',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 8,
    ingredient_name: 'cumin',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 12,
    ingredient_name: 'smoked paprika',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 3,
    recipe_name: 'Chilli con Carne',
    recipe_img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    recipe_link:
      'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredient_id: 7,
    ingredient_name: 'garlic',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 5,
    ingredient_name: 'onion',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 14,
    ingredient_name: 'curry-paste',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 15,
    ingredient_name: 'coconut milk',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 16,
    ingredient_name: 'sweet potato',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 17,
    ingredient_name: 'lime',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 18,
    ingredient_name: 'ginger',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 4,
    recipe_name: 'Sweet Potato Curry',
    recipe_img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    recipe_link:
      'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredient_id: 7,
    ingredient_name: 'garlic',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 3,
    ingredient_name: 'egg',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1132,
    ingredient_name: 'milk',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1133,
    ingredient_name: 'cinnamon',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1134,
    ingredient_name: 'bread',
    ingredients_types_id: 1,
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1135,
    ingredient_name: 'butter',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 394,
    recipe_name: 'French Toast',
    recipe_img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    recipe_link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredient_id: 1136,
    ingredient_name: 'maple syrup',
    ingredients_types_id: 2,
  },
  {
    recipe_id: 3,
    name: 'Chilli con Carne',
    img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    user_id: 10,
  },
  {
    recipe_id: 4,
    name: 'Sweet Potato Curry',
    img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    user_id: 10,
  },
];
const dynamicArrayAfterReduce = [
  {
    id: 1,
    name: 'Carbonara',
    img:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    link: 'https://www.bonappetit.com/recipe/simple-carbonara',
    ingredients: ['bacon', 'parmesan', 'egg', 'pasta'],
    spices: [],
  },
  {
    id: 2,
    name: 'Shakshuka',
    img:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    link: 'https://toriavey.com/toris-kitchen/shakshuka/',
    ingredients: ['onion', 'egg', 'canned tomatos'],
    spices: ['garlic', 'cumin', 'chilli'],
  },
  {
    id: 3,
    name: 'Chilli con Carne',
    img:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    link: 'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
    ingredients: ['minced meat', 'beans', 'onion', 'canned tomatos'],
    spices: ['chilli', 'cumin', 'smoked paprika', 'garlic'],
  },
  {
    id: 4,
    name: 'Sweet Potato Curry',
    img:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    link: 'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
    ingredients: ['onion', 'curry-paste', 'coconut milk', 'sweet potato'],
    spices: ['lime', 'ginger', 'garlic'],
  },
  {
    id: 394,
    name: 'French Toast',
    img:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80',
    link: 'https://www.simplyrecipes.com/recipes/french_toast/',
    ingredients: ['egg', 'milk', 'bread'],
    spices: ['cinnamon', 'butter', 'maple syrup'],
  },
];
//Test

test('recuding the dynamic Page Array', () => {
  const reducedArray = dynamicPageReducer(dynamicArrayBeforeReduce);
  expect(reducedArray).toEqual(dynamicArrayAfterReduce);
  expect(reducedArray.length).toBe(5);
});
