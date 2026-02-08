"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import ComposeModal from "@/components/ComposeModal";
import EmailTable from "@/components/EmailTable";

export default function Home() {
  const { data: session, status } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // ⏳ While checking login status
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // ❌ Not logged in
  if (!session) {
    return (
      <div>
        <h1>Mini Production System</h1>
        <button onClick={() => signIn("google")}>
          Sign in with Google
        </button>
      </div>
    );
  }

  // ✅ Logged in UI
  return (
    <div>
      <h1>Welcome {session.user?.name} 🎉</h1>
      <p>{session.user?.email}</p>

      <button onClick={() => setShowModal(true)}>Compose Email</button>
      <button onClick={() => signOut()}>Sign out</button>

      {showModal && (
        <ComposeModal
          onClose={() => setShowModal(false)}
          onSent={() => setRefresh((r) => r + 1)}
        />
      )}

      <h2>Sent Emails</h2>
      <EmailTable refresh={refresh} />
    </div>
  );
}
