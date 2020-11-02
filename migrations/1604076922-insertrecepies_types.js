exports.up = async function (sql) {
  await sql`
	INSERT INTO ingredient_types
  (name)
VALUES
  ('main'),
  ('spices');
   `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM ingredient_types;
  `;
};
