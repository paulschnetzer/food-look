import argon2 from 'argon2';
import Tokens from 'csrf';
import { registerUser, getUserByUsername } from '../../util/DataBase';

const tokens = new Tokens();

export default async function handler(request, response) {
  const { username, password, token } = request.body;

  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    response.status(500).send({ success: false });
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }
  const verified = tokens.verify(secret, token);

  if (!verified) {
    return response.status(401).send({ success: false });
  }

  const usernameAlreadyTaken =
    typeof (await getUserByUsername(username)) !== 'undefined';

  if (usernameAlreadyTaken) {
    // TODO: Send back a full error message here
    // HTTP status code: 409 Conflict
    return response.status(409).send({ success: false });
  }
  try {
    const passwordHash = await argon2.hash(password);
    await registerUser(username, passwordHash);
  } catch (err) {
    return response.status(500).send({ success: false });
  }
  response.send({ success: true });
}
