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

## Autor

[Felipe Santos](https://github.com/FelipeSantos92Dev)

## Links Úteis

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Git](https://git-scm.com/)
