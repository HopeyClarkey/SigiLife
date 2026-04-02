import 'dotenv/config';
import { PrismaClient } from '../prisma/generated/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbUrl = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL || process.env.PROD_DATABASE_URL;

if (!dbUrl){
  throw new Error ('No db url in env!')
}
const url = new URL(dbUrl)

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

export default prisma;