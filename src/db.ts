import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { logger } from "./logger";
import { UserEntity } from "./user/db/models/user.model";

dotenv.config();

const PostgresDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: true,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [UserEntity],
});

export async function getConnection(): Promise<DataSource> {
  const { isInitialized } = PostgresDataSource;
  if (!isInitialized) {
    return PostgresDataSource.initialize()
      .then((connection) => {
        logger().info("Connected to Postgres");
        return connection;
      })
      .catch((err) => {
        logger().error(err);
        return err;
      });
  }
  return PostgresDataSource;
}
