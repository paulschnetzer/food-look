import crypto from 'crypto';
import {
  deleteExpiredSessions,
  getUserByUsername,
  insertSession,
} from '../../util/database';
import cookie from 'cookie';
import argon2 from 'argon2';

export default async function handler(request, response) {
  const { username, password } = request.body;
  const user = await getUserByUsername(username);

  if (typeof user === 'undefined') {
    return response.status(401).send({ success: false });
  }
  const passwordVerified = await argon2.verify(user.passwordHash, password);

  if (!passwordVerified) {
    return response.status(401).send({ success: false });
  }
  const token = crypto.randomBytes(24).toString('base64');
  const session = await insertSession(token, user.id);

  const maxAge = 60 * 60 * 24;

  const isProduction = process.env.NODE_ENV === 'production';

  const sessionCookie = cookie.serialize('session', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });

  response.setHeader('Set-Cookie', sessionCookie);

  response.send({ success: true });
  await deleteExpiredSessions();
}
