import React from 'react';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignIn from '../../../components/SignIn';

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid place-items-center">
      <div>
        <Image
          className="mx-2 rounded-full object-cover"
          width={300}
          height={300}
          src="/meta.png"
          alt="Profile picture"
        />
      </div>

      <SignIn providers={providers} />
    </div>
  );
}
