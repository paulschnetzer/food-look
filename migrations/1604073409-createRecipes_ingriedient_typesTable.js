exports.up = async function (sql) {
  await sql`
    CREATE TABLE recipes_ingredients_types (
  PRIMARY KEY (recipe_id, ingredient_id, ingredient_type_id),
  recipe_id INT REFERENCES recipes (id),
  ingredient_id INT REFERENCES ingredients (id),
  ingredient_type_id INT REFERENCES ingredient_types (id)

);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS recipes_ingredients_types;
  `;
};
