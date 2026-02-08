import "reflect-metadata";
import { DataSource } from "typeorm";
import { Email } from "./entities/Email";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite", // auto-created file
  synchronize: true,           // auto-create tables
  logging: false,
  entities: [Email],
  migrations: [],
  subscribers: [],
});
