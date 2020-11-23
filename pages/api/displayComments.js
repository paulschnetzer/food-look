import { getComment } from '../../util/database';

export default async function handler(request, response) {
  const { userId } = request.body;

  try {
    const comments = getComment(userId);
    response.send({ comments });
  } catch (err) {
    return response.status(500).send({ success: false });
  }
}
