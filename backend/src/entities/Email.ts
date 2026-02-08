import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum EmailStatus {
    SCHEDULED = "scheduled",
    SENT = "sent",
    FAILED = "failed"
}

@Entity()
export class Email {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    recipient!: string;

    @Column()
    subject!: string;

    @Column()
    body!: string;

    @Column({ type: "datetime" })
    scheduledAt!: Date;

    @Column({ type: "enum", enum: EmailStatus, default: EmailStatus.SCHEDULED })
    status!: EmailStatus;

    @CreateDateColumn()
    createdAt!: Date;
}
