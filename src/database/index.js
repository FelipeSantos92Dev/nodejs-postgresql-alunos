import pgp from "pg-promise";
import { config } from "dotenv";
import path, { join } from "path";
import { fileURLToPath } from "url";

config();

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

export function createConnection() {
  db.query("SELECT 1 + 1 AS result").then((result) => {
    console.log(result);
  });
}

// Captura o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = join(__dirname, "create-tables.sql");
const query = new pgp.QueryFile(filePath);

db.query(query);

export default db;
