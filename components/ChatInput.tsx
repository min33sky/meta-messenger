'use client';

import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import useSWR from 'swr';
import fetcher from '../utils/fetchMessages';

export default function ChatInput() {
  const [text, setText] = useState('');
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || !text.trim()) return;

    const id = uuid();

    const message: Message = {
      id,
      message: text,
      createdAt: Date.now(),
      username: 'test',
      profilePic:
        'https://ac-p2.namu.la/20220403sac/784cf3736ac11a9f07f38cd6c4b47745bf94ffde7f5c5fd8318950514c7d6f15.png',
      email: 'test@test.com',
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