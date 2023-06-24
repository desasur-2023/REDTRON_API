import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { logger } from "./logger";
import { UserEntity } from "./models/user.model";
import { CasinoEntity } from "./models/casino.model";


dotenv.config();

// const PostgresDataSource = new DataSource({
//   type: "postgres",
//   synchronize: true,
//   logging: false,
//   host: process.env.PG_HOST,
//   port: Number(process.env.PG_PORT),
//   username: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   entities: [UserEntity, CasinoEntity],
// });

const PostgresDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  url: process.env.DATABASE_URL, // Reemplaza process.env.DATABASE_URL con la URL proporcionada por Railway
  entities: [UserEntity, CasinoEntity],
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
