// SELECT
//   recipes.id as recipe_id,
//   recipes.name as recipe_name,
//   recipes.img as recipe_img,
//   recipes.link as recipe_link,
//   ingredients.id as ingredient_id,
//   ingredients.name as ingredient_name
// FROM
//   recipes,
//   ingredients,
//   ingredient_types,
//   recipes_ingredients_types
// WHERE
//   ingredient_types.name = 'main' AND
//   recipes_ingredients_types.ingredient_type_id = ingredient_types.id AND
//   recipes_ingredients_types.recipe_id = recipes.id AND
//   recipes_ingredients_types.ingredient_id = ingredients.id;

export const foodDataBase = [
  {
    id: '1',
    name: 'Carbonara',
    ing: ['bacon', 'parmesan', 'egg', 'pasta'],
    spices: [undefined],
    basics: ['water', 'salt', 'pepper', 'oil'],
    image:
      'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    link: 'https://www.bonappetit.com/recipe/simple-carbonara',
  },
  {
    id: '2',
    name: 'Shakshuka',
    ing: ['onion', 'egg', 'canned tomatos'],
    spices: ['garlic', 'cumin', 'chilli'],
    basics: ['salt', 'pepper', 'oil'],
    image:
      'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    link: 'https://toriavey.com/toris-kitchen/shakshuka/',
  },
  {
    id: '3',
    name: 'Chilli con Carne',
    ing: ['minced-meat', 'beans', 'onion', 'canned tomatos'],
    spices: ['chilli', 'cumin', 'smoked paprika', 'garlic', 'marjoram'],
    basics: ['water', 'salt', 'pepper', 'oil'],
    image:
      'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
    link: 'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
  },
  {
    id: '4',
    name: 'Sweet Potato Curry',
    ing: ['onion', 'curry-paste', 'coconut-milk', 'sweet potato'],
    spices: ['lime', 'ginger', 'garlic'],
    basics: ['water', 'salt', 'pepper', 'oil'],
    image:
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
    link: 'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
  },
];
