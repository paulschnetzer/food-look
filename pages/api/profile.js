import { deleteUserRecipe } from '../../util/database';

export default async function handler(request, response) {
  const { recipeId, userId } = request.body;

  try {
    deleteUserRecipe(recipeId, userId);
    response.send({ success: userId });
  } catch (err) {
    return response.status(500).send({ success: false });
  }
}
