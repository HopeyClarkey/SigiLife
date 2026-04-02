import 'dotenv/config';
import { PrismaClient } from '../prisma/generated/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbUrl = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL || process.env.PROD_DATABASE_URL;

if (!dbUrl){
  throw new Error ('No db url in env!')
}
const url = new URL(dbUrl)

const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password || undefined,
  database: url.pathname.slice(1),
  port: url.port ? parseInt(url.port) : 3306,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export default  prisma ;
