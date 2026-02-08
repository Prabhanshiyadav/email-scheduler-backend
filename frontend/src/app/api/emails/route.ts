import { NextResponse } from "next/server";

interface Email {
  id: number;
  to: string;
  subject: string;
  message: string;
  createdAt: Date;
  fileName?: string;
}

const emails: Email[] = []; // temporary in-memory storage

// GET → fetch all emails
export async function GET() {
  return NextResponse.json(emails);
}

// POST → save a new email (accepts JSON or multipart/form-data)
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";

    let to = "demo@example.com";
    let subject = "";
    let message = "";
    let fileName: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      // keys used by the front-end: "subject", "body", "file"
      subject = form.get("subject")?.toString() ?? "";
      message = form.get("body")?.toString() ?? "";
      const file = form.get("file") as File | null;
      if (file && file.name) fileName = file.name;
      // optional: if front-end sends `to`, pick it up
      to = form.get("to")?.toString() ?? to;
    } else {
      const body = await req.json();
      to = body.to ?? to;
      subject = body.subject ?? "";
      message = body.message ?? body.body ?? "";
    }

    const newEmail: Email = {
      id: Date.now(),
      to,
      subject,
      message,
      createdAt: new Date(),
      fileName,
    };

    emails.unshift(newEmail); // newest first

    return NextResponse.json({ success: true, email: newEmail });
  } catch (err) {
    console.error("Error parsing request in /api/emails:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}