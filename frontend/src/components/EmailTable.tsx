"use client";

import { useEffect, useState } from "react";

interface Email {
  to: string;
  subject: string;
  sentAt: string | Date;
  status?: string;
}

interface Props {
  refresh: number;
}

export default function EmailTable({ refresh }: Props) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/emails");
        if (!res.ok) throw new Error("Failed to fetch emails");

        const data: Email[] = await res.json();
        setEmails(data);
      } catch (err) {
        console.error("Error fetching emails", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [refresh]);

  if (loading) return <p>Loading emails...</p>;
  if (emails.length === 0) return <p>No emails found.</p>;

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Subject</th>
          <th className="border px-4 py-2">Scheduled At</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {emails.map((email, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{email.to}</td>
            <td className="border px-4 py-2">{email.subject}</td>
            <td className="border px-4 py-2">
              {new Date(email.sentAt).toLocaleString()}
            </td>
            <td className="border px-4 py-2">{email.status ?? "Scheduled"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
