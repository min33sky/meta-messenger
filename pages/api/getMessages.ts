// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../redis';
import { Message } from '../../typings';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const messageResults = await redis.hvals('messages');
    const messages: Message[] = messageResults
      .map((message) => JSON.parse(message))
      .sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({ messages });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
