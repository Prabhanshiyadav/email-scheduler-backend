import express, { Request, Response } from "express";
import Email, { IEmail } from "../models/Email";

const router = express.Router();

interface ScheduleEmailBody {
  to: string;
  subject: string;
  body: string;
  sentAt: string | Date; // accept string from frontend
}

/**
 * ➕ Save Scheduled Email
 */
router.post(
  "/schedule",
  async (req: Request<{}, {}, ScheduleEmailBody>, res: Response) => {
    try {
      const { to, subject, body, sentAt } = req.body;

      // Basic validation
      if (!to || !subject || !body || !sentAt) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const email = new Email({
        to,
        subject,
        body,
        sentAt: new Date(sentAt),
      });

      const savedEmail: IEmail = await email.save();

      res.status(201).json({
        message: "Email scheduled successfully!",
        email: savedEmail,
      });
    } catch (err: any) {
      console.error("Schedule Email Error:", err);
      res.status(500).json({ error: "Failed to schedule email." });
    }
  }
);

/**
 * 📥 Get All Emails
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const emails: IEmail[] = await Email.find().sort({ sentAt: -1 });
    res.status(200).json(emails);
  } catch (err: any) {
    console.error("Fetch Emails Error:", err);
    res.status(500).json({ error: "Failed to fetch emails." });
  }
});

export default router;
