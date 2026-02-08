import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold">ReachInbox Dashboard</h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </header>
  );
}
