import { createPool } from "mysql2/promise";

const conn = createPool({
  host: process.env.VITE_HOST,
  user: process.env.VITE_USER,
  password: process.env.VITE_PASSWORD,
  port: process.env.VITE_PORT,
  database: process.env.VITE_DATABASE,
});

export { conn };

/*import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: process.env.VITE_HOST,
    user: process.env.VITE_USER,
    password: process.env.VITE_PASSWORD,
    port: process.env.VITE_PORT,
    database: process.env.VITE_DATABASE,
  },
});*/
