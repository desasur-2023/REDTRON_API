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

dotenv.config();

const PostgresDataSourceInDevelopmentTrial = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  url: process.env.DATABASE_URL, 
  entities: [UserEntity, CasinoEntity, PlayerEntity, LoadEntity, HistoricEntity,WithdrawalEntity, SettleAcountEntity,User_Casino_Entity],
 });


const PostgresDataSourceUnderDevelopment = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [UserEntity, CasinoEntity, PlayerEntity, LoadEntity, HistoricEntity, WithdrawalEntity, SettleAcountEntity,User_Casino_Entity],
});

let PostgresDataSource: DataSource;

process.env.NODE_DB?PostgresDataSource = PostgresDataSourceInDevelopmentTrial : PostgresDataSource = PostgresDataSourceUnderDevelopment

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
