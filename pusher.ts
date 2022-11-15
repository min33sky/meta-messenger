import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: process.env.APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
  useTLS: true,
});

export const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_KEY!, {
  cluster: process.env.CLUSTER!,
  forceTLS: true,
});
