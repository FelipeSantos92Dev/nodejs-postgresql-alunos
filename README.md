# Projeto Inicial NodeJS

## Descrição

Ponto de partida para desenvolvimento em NodeJS, integrando Express, Nodemon e dotenv para otimizar a produtividade e permitir que desenvolvedores foquem na lógica do aplicativo.

## Objetivo

Encorajar boas práticas e fornecer uma base que promova a escalabilidade e manutenção, inspirando a criação de funcionalidades inovadoras e soluções para desafios complexos no ecossistema NodeJS.

## Tecnologias

- NodeJS
- PostgreSQL
- NPM
- Express
- Nodemon
- Git

## Pré-requisitos

Para executar este projeto é necessário ter instalado:

- NodeJS
- PostgreSQL
- NPM

## Instalação

Para instalar o projeto, siga os passos abaixo:

1. Clone o projeto para sua máquina
2. Execute o comando `npm install` para instalar as dependências do projeto
3. Execute o comando `npm run dev` para iniciar o projeto

## Etapas de integração com o banco de dados PostgreSQL

1. Criação da base de dados

```bash
sudo su - postgres
psql
```

```sql
CREATE DATABASE users_pg_dev;
```

2. Criar um arquivo `.env` na raiz do projeto para armazenar as variáveis de ambiente

```env
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=database
```

3. Instalar a biblioteca `pg-promise` para integração com o banco de dados PostgreSQL

```bash
npm install pg-promise
```

4. Criar um arquivo `database/index.js` na raiz do projeto para configurar a conexão com o banco de dados

```javascript
import pgp from "pg-promise";
import { config } from "dotenv";

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

export default function createConnection() {
  const db = pgp()(dbURL);

  db.query("SELECT 1 + 1 AS result").then((result) => {
    console.log(result);
  });
}
```

5. Importar a função `createConnection` no arquivo `server.js` e chamar a função para testar a conexão com o banco de dados

```javascript
import createConnection from "./database/index.js";

createConnection();
```

6. Criação da tabela `users` no arquivo `database/create-tables.sql`

```sql
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

7. Atualizar configurações de conexão com o banco de dados no arquivo `database/index.js`

```javascript
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
```

8. Implementação dos métodos CRUD para a tabela `users` no arquivo `UsersRepository.js`

```javascript
import db from "../../database/index.js";

export default class UsersRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    const allUsers = await this.db.manyOrNone("SELECT * FROM users");
    // console.log(allUsers);
    return allUsers;
  }

  async getUserById(id) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE id = $1",
      id
    );
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      email
    );
    return user;
  }

  async createUser(user) {
    await this.db.none(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]
    );
    return user;
  }

  async updateUser(id, name, email, password) {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }

    const updatedUser = await this.db.one(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );

    return updatedUser;
  }

  async deleteUser(id) {
    await this.db.none("DELETE FROM users WHERE id = $1", id);
  }
}
```

9. Implementação de métodos assíncronos no arquivo `users.controller.js`

## Autor

[Felipe Santos](https://github.com/FelipeSantos92Dev)

## Links Úteis

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Git](https://git-scm.com/)
