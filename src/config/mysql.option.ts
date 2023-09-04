import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

const mysqlOption = new DataSource({
  type: 'mysql',
  url: process.env.MYSQL_URL,
  charset: 'utf8mb4_general_ci',
  migrationsTableName: 'migration',
  entities: [__dirname + process.env.MYSQL_ENTITIES_URL],
  logging: true,
  synchronize: true,
});
export default mysqlOption;
