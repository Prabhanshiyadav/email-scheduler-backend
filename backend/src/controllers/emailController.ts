import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Email, EmailStatus } from "../entities/Email";
import { emailQueue } from "../jobs/emailQueue";

export const scheduleEmail = async (req: Request, res: Response) => {
    const { recipient, subject, body, scheduledAt } = req.body;

    const emailRepo = AppDataSource.getRepository(Email);

    const email = emailRepo.create({
        recipient,
        subject,
        body,
        scheduledAt,
        status: EmailStatus.SCHEDULED
    });

    await emailRepo.save(email);

    const delay = new Date(scheduledAt).getTime() - new Date().getTime();

    await emailQueue.add("sendEmail", { emailId: email.id }, { delay });

    res.status(201).json({ message: "Email scheduled", email });
};
