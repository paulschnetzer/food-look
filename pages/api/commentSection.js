import { insertComment } from '../../util/database';

export default async function handler(request, response) {
  const { comment, recipeId, userId, date } = request.body;

  try {
    insertComment(comment, recipeId, userId, date);
    response.send({ success: true });
  } catch (err) {
    return response.status(500).send({ success: false });
  }
}
