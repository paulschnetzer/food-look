// CREATE TABLE user_roles (
//   id SERIAL PRIMARY KEY,
//   user_role VARCHAR(10)
// // );

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   user_name VARCHAR(50),
//   password_hash VARCHAR(100),
//   user_role_id INT REFERENCES user_roles (id)
// );
// // SELECT
// //   users.id,
//   users.user_name,
//   users.password_hash,
//   user_roles.user_role AS user_role
// FROM
//   user_roles, users
// WHERE
//   users.user_role_id = user_roles.id AND
//   user_roles.user_role = 'user';

// export const foodDataBase = [
//   {
//     id: '1',
//     name: 'Carbonara',
//     ing: ['bacon', 'parmesan', 'egg', 'pasta'],
//     spices: [undefined],
//     basics: ['water', 'salt', 'pepper', 'oil'],
//     image:
//       'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//     link: 'https://www.bonappetit.com/recipe/simple-carbonara',
//   },
//   {
//     id: '2',
//     name: 'Shakshuka',
//     ing: ['onion', 'egg', 'canned tomatos'],
//     spices: ['garlic', 'cumin', 'chilli'],
//     basics: ['salt', 'pepper', 'oil'],
//     image:
//       'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
//     link: 'https://toriavey.com/toris-kitchen/shakshuka/',
//   },
//   {
//     id: '3',
//     name: 'Chilli con Carne',
//     ing: ['minced-meat', 'beans', 'onion', 'canned tomatos'],
//     spices: ['chilli', 'cumin', 'smoked paprika', 'garlic', 'marjoram'],
//     basics: ['water', 'salt', 'pepper', 'oil'],
//     image:
//       'https://cdn.pixabay.com/photo/2014/06/28/14/14/chili-con-carne-378952_1280.jpg',
//     link: 'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/',
//   },
//   {
//     id: '4',
//     name: 'Sweet Potato Curry',
//     ing: ['onion', 'curry-paste', 'coconut-milk', 'sweet potato'],
//     spices: ['lime', 'ginger', 'garlic'],
//     basics: ['water', 'salt', 'pepper', 'oil'],
//     image:
//       'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80',
//     link: 'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/',
//   },
// ];
