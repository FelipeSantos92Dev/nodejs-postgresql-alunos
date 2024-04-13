import pgp from "pg-promise";
import { config } from "dotenv";

config();

export default function createConnection() {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT;
  const database = process.env.DB_NAME;

  const dbURL =
    "postgres://" +
    user +
    ":" +
    password +
    "@" +
    host +
    ":" +
    port +
    "/" +
    database;

  const db = pgp()(dbURL);

  db.query("SELECT 1 + 1 AS result").then((result) => {
    console.log(result);
  });
}
