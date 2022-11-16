import { unstable_getServerSession } from 'next-auth/next';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import { Message } from '../typings';

export default async function Home() {
  const data = await fetch(
    `${process.env.VERCEL_URL ?? 'http://localhost:3000'}/api/getMessages`,
  ).then((res) => res.json());

  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();

  return (
    <main className="">
      <MessageList initialMessages={messages} />
      <ChatInput session={session} />
    </main>
  );
}
