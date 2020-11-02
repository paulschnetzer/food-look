exports.up = async function (sql) {
  await sql`
   INSERT INTO ingredients
  (name)
VALUES
  ('bacon'),
  ('parmesan'),
  ('egg'),
  ('pasta'),
  ('onion'),
  ('canned tomatos'),
  ('garlic'),
  ('cumin'),
  ('chilli'),
  ('minced meat'),
  ('beans'),
  ('smoked paprika'),
  ('marjoram'),
  ('curry-paste'),
  ('coconut milk'),
  ('sweet potato'),
  ('lime'),
  ('ginger')
  ;`;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM ingredients;
  `;
};
