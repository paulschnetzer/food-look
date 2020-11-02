exports.up = async function (sql) {
  await sql`
    INSERT INTO recipes
  (name, img, link)
VALUES
  ('Carbonara','https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'https://www.bonappetit.com/recipe/simple-carbonara'),
  ('Shakshuka','https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80', 'https://toriavey.com/toris-kitchen/shakshuka/'),
  ('Chilli con Carne','https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=631&q=80', 'https://www.food24.com/recipe/cheats-5-ingredient-chilli-con-carne/'),
  ('Sweet Potato Curry','https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80', 'https://www.eatingbirdfood.com/5-ingredient-sweet-potato-curry/');
  `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM recipes;
  `;
};
