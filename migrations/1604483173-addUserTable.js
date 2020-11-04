exports.up = async function (sql) {
  await sql`
  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50),
  password_hash VARCHAR(100),
  user_role_id INT REFERENCES user_roles (id)
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS users;
  `;
};
