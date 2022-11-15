// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { serverPusher } from '../../pusher';
import redis from '../../redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { message } = req.body;

    const newMessage = {
      ...message,
      // Replace the timestamp of the user to the timestamp of the server
      createdAt: Date.now(),
    };

    try {
      // Push to upstash redis db
      await redis.hset('messages', newMessage.id, JSON.stringify(newMessage));

      // Push to pusher
      serverPusher.trigger('messages', 'new-message', newMessage);

      res.status(200).json({ message: newMessage });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
