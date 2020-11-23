exports.up = async function (sql) {
  await sql`
  CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  recipe_id INT REFERENCES recipes (id),
	user_id INT REFERENCES users (id),
	upload_date VARCHAR(14)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS comments;
  `;
};
