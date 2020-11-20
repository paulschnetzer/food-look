import {
  deleteRecipeFromJointTable,
  deleteRecipeFromRecipeTable,
} from '../../util/database';

export default async function handler(request, response) {
  const { id } = request.body;

  try {
    deleteRecipeFromJointTable(id);
    deleteRecipeFromRecipeTable(id);
    response.send({ success: 'worked' });
  } catch (err) {
    return response.status(500).send({ success: false });
  }
}
