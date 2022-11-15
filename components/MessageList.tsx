'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { clientPusher } from '../pusher';
import { Message as MessageType } from '../typings';
import fetcher from '../utils/fetchMessages';
import Message from './Message';

interface Props {
  initialMessages: MessageType[];
}

export default function MessageList({ initialMessages }: Props) {
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');
    console.log('시발', channel);

    channel.bind('new-message', async (data: MessageType) => {
      console.log('data>>> ', data);

      // if you sent the message, no need to update cache
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate]);

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-5 pt-8 pb-32 xl:max-w-4xl">
      {(messages || initialMessages).map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
}
