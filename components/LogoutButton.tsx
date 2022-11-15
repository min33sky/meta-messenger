'use client';

export default function LogoutButton() {
  return (
    <button
      onClick={() => console.log('Hello')}
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    >
      로그아웃
    </button>
  );
}
