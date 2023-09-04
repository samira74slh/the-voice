import { registerAs } from '@nestjs/config';
import mysqlOption from './mysql.option';

export default registerAs('local', () => ({
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  mysql: mysqlOption.options,
  JwtSecret: process.env.JWT_SECRET,
}));
