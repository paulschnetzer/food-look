import { getSessionByToken } from './database';

export async function isSessionTokenValid(token) {
  if (typeof token === 'undefined') {
    return false;
  }

  const session = await getSessionByToken(token);

  if (typeof session === 'undefined') {
    return false;
  }

  if (session.expiryTimestamp < new Date()) {
    return false;
  }

  return true;
}
