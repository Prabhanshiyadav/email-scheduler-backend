import React, { useState } from "react";

interface Props {
  onClose?: () => void;
  onSent?: () => void;
}

export default function ComposeModal({ onClose, onSent }: Props) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sentAt, setSentAt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!to || !subject || !body || !sentAt) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/emails/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          body,
          sentAt,
        }),
      });

      if (!res.ok) {
        console.error("Failed to schedule email");
        return;
      }

      onSent?.();
      onClose?.();
    } catch (err) {
      console.error("Error scheduling email", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Schedule Email</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Recipient Email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <textarea
            placeholder="Email Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 rounded"
            rows={4}
            required
          />

          <input
            type="datetime-local"
            value={sentAt}
            onChange={(e) => setSentAt(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Schedule
          </button>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
