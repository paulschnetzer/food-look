exports.up = async function (sql) {
  await sql`
    CREATE TABLE user_recipe (
  PRIMARY KEY (recipe_id, users_id),
  recipe_id INT REFERENCES recipes (id),
  users_id INT REFERENCES users (id)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS user_recipe;
  `;
};
