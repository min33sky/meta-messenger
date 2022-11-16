'use client';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

interface Props {
  session: Session | null;
}

export default function ChatInput({ session }: Props) {
  const [text, setText] = useState('');
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || !text.trim() || !session) return;

    const id = uuid();

    const message: Message = {
      id,
      message: text,
      createdAt: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const response = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });

    setText('');
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 flex w-full space-x-2 border-t border-slate-500 bg-slate-800 px-10 py-5"
    >
      <input
        disabled={!session}
        type="text"
        className="flex-1 rounded-md border border-gray-300 px-5 py-3 text-slate-800 outline-none
        focus:border-transparent focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="메세지를 입력하세요..."
        value={text}
        onChange={handleChange}
      />
      <button
        disabled={!text}
        className="rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700
      disabled:cursor-not-allowed disabled:opacity-50"
      >
        전송
      </button>
    </form>
  );
}
