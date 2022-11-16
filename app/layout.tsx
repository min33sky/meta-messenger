import './globals.css';
import Header from '../components/Header';
import Providers from '../components/Providers';
import { unstable_getServerSession } from 'next-auth/next';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex min-h-screen flex-col bg-slate-800 text-slate-200">
        <Header />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
