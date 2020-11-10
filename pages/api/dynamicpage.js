import { insertUserRecipe } from '../../util/DataBaseUser';

export default async function handler(request, response) {
  const { recipeId, userId } = request.body;

  try {
    insertUserRecipe(recipeId, userId);
  } catch (err) {
    return response.status(500).send({ success: false });
  }
  response.send({ success: true });
}
