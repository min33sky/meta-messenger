'use client';

import { getProviders, signIn } from 'next-auth/react';
import React from 'react';

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export default function SignIn({ providers }: Props) {
  return (
    <div>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            type="button"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || 'http://localhost:3000',
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
