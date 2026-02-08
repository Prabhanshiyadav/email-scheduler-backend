import { Queue, Worker, Job } from "bullmq";
import { connection } from "../config/redis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { AppDataSource } from "../config/db";
import { Email, EmailStatus } from "../entities/Email";

dotenv.config();

// Queue setup
export const emailQueue = new Queue("emailQueue", { connection });

// Worker
export const emailWorker = new Worker(
  "emailQueue",
  async (job: Job) => {
    const { emailId } = job.data;
    const emailRepo = AppDataSource.getRepository(Email);
    const email = await emailRepo.findOneBy({ id: emailId });

    if (!email) throw new Error("Email not found");

    try {
      // Send email via Ethereal
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASS
        }
      });

      await transporter.sendMail({
        from: `"ReachInbox" <${process.env.ETHEREAL_USER}>`,
        to: email.recipient,
        subject: email.subject,
        text: email.body
      });

      email.status = EmailStatus.SENT;
      await emailRepo.save(email);
      console.log(`Email sent to ${email.recipient}`);
    } catch (err) {
      console.error(err);
      email.status = EmailStatus.FAILED;
      await emailRepo.save(email);
    }
  },
  {
    connection,
    concurrency: 5 // configurable
  }
);
