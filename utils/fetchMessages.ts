import { Message } from '../typings';

async function fetcher() {
  const res = await fetch('/api/getMessages');
  const data = await res.json();
  const messages: Message[] = data.messages;
  return messages;
}

export default fetcher;
