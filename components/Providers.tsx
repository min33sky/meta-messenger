'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
  session: any;
}

export default function Providers({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
