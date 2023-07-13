import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { logger } from "./logger";
import { UserEntity } from "./models/user.model";
import { CasinoEntity } from "./models/casino.model";
import { PlayerEntity } from "./models/player.model";
import { LoadEntity } from "./models/load.model";
import { HistoricEntity } from "./models/historic.model";
import { WithdrawalEntity } from "./models/withdrawal.model";
import { SettleAcountEntity } from "./models/settleAcount.model";
import { User_Casino_Entity } from "./models/user_casino.model";
import { CoinsMovementsEntity } from "./models/coinsMovements.model";

dotenv.config();

const configDb = process.env.NODE_DB ? {
  host: process.env.PG_DEV_HOST,
  port: Number(process.env.PG_DEV_PORT),
  username: process.env.PG_DEV_USER,
  password: process.env.PG_DEV_PASSWORD,
  database: process.env.PG_DEV_DATABASE,
} :
{
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
}

const PostgresDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  ...configDb,
  entities: [UserEntity, CasinoEntity, PlayerEntity, LoadEntity, HistoricEntity, WithdrawalEntity, SettleAcountEntity,User_Casino_Entity, CoinsMovementsEntity],
});

export async function getConnection(): Promise<DataSource> {
  const { isInitialized } = PostgresDataSource;
  if (!isInitialized) {
    return PostgresDataSource.initialize()
      .then((connection) => {
        logger().info(`${process.env.NODE_DB ? "Connected to Postgres Remotly"
        : "Connected to Postgres Localy"}` 
        + ` - database name: ${connection.driver.database}`);
        return connection;
      })
      .catch((err) => {
        logger().error(err);
        return err;
      });
  }
  return PostgresDataSource;
}
