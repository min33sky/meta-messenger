import { unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default async function Header() {
  const session = await unstable_getServerSession();

  return (
    <header
      className={`sticky top-0 z-50 flex items-center bg-slate-900 p-10 shadow-sm
    ${session ? 'justify-between' : 'justify-center'}`}
    >
      {session ? (
        <>
          <div className="flex space-x-2">
            <div>
              <Image
                src={session.user?.image!}
                className="mx-2 rounded-full object-contain"
                width={50}
                height={10}
                alt="Profile Picture"
              />
            </div>
            <div>
              <p className="text-blue-400">로그인 한 계정 : </p>
              <p className="text-lg font-bold">{session.user?.name}</p>
            </div>
          </div>
          <LogoutButton />
        </>
      ) : (
        <div className="flex flex-col items-center space-y-5">
          <div className="flex items-center space-x-2">
            <Image src={'/logo-Meta.png'} width={50} height={10} alt="Logo" />
            <p className="text-blue-400">Welcome to Meta Messenger</p>
          </div>

          <Link
            href={'/auth/signin'}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          >
            로그인
          </Link>
        </div>
      )}
    </header>
  );
}
