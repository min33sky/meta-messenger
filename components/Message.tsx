import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { Message as MessageType } from '../typings';
import TimeAgo from 'react-timeago';

interface Props extends MessageType {}

export default function Message({
  message,
  createdAt,
  username,
  profilePic,
  email,
}: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === email;

  return (
    <article className={`flex w-fit  ${isUser && 'ml-auto'}`}>
      <figure className={`flex-shrink-0 ${isUser && 'order-1'}`}>
        <Image
          className="mx-2 rounded-full"
          src={profilePic}
          height={10}
          width={50}
          alt="profilePic"
        />
      </figure>

      <div>
        <p
          className={`px-0.5 py-0.5 text-[0.65rem] ${
            isUser ? 'text-right text-blue-400' : 'text-left text-red-400'
          }`}
        >
          {username}
        </p>

        <div className="flex items-end">
          <div
            className={`w-fit rounded-lg px-3 py-2 text-white ${
              isUser ? 'order-1 ml-auto bg-blue-400' : 'bg-red-400'
            }`}
          >
            <p>{message}</p>
          </div>

          <p
            className={`px-2 text-[0.65rem] italic text-gray-300 ${
              isUser && 'text-right'
            }`}
          >
            <TimeAgo date={new Date(createdAt)} />
          </p>
        </div>
      </div>
    </article>
  );
}
