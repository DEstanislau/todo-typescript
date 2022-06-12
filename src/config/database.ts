import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
   client: "postgres",
   connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      multipleStatements: true
   },
});

export default db 