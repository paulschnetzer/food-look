exports.up = async function (sql) {
  await sql`
	INSERT INTO recipes_ingredients_types
  (recipe_id, ingredient_id, ingredient_type_id)
VALUES
  (1, 1, 1),
  (1, 2, 1),
  (1, 3, 1),
  (1, 4, 1),
  (2, 5, 1),
  (2, 3, 1),
  (2, 6, 1),
  (2, 7, 2),
  (2, 8, 2),
  (2, 9, 2),
  (3, 10, 1),
  (3, 11, 1),
  (3, 5, 1),
  (3, 6, 1),
  (3, 9, 2),
  (3, 8, 2),
  (3, 12, 2),
  (3, 7, 2),
  (4, 5, 1),
  (4, 14, 1),
  (4, 15, 1),
  (4, 16, 1),
  (4, 17, 2),
  (4, 18, 2),
  (4, 7, 2)
  ;
   `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM recipes_ingredients_types;
  `;
};
