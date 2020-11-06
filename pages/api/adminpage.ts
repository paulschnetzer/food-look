import { NextApiRequest, NextApiResponse } from 'next';




export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const newRecipy= request.body;
  response.send({ success: newRecipy});

}
