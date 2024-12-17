# CsvToJsonConverter

## Description

This is a Node.js and TypeScript application that fetches a processes a CSV file using custom logic, converts it to JSON format, and insert or updates in Postgres database. After uploading to database, it calculates age distribution of all users and print it on cosnole.

## Features

- Processes CSV file and converts to JSON format
- Uploads JSON in Postgres database
- Prisma ORM
- Error handling and logging
- TypeScript for type safety

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- PostgreSQL DB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kiranshendge/CsvToJsonConverter.git
   cd CsvToJsonConverter

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**
   Create a .env file in the root directory and add the following environment variables:
   ```Env
   DATABASE_URL="postgresql://<username>:<password>@localhost:5433/dev?schema=public&connection_limit=10"
   PORT=3000
   CSV_FILE_PATH=<path to CSV file>
   BATCH_SIZE=1000
   ```

## Set up the database

1. **Initialize Prisma:**

   ```bash
   npx prisma migrate dev --name init

   ```

2. **Generate Prisma Client:**

   ```bash
   npx prisma generate

   ```

## Run the application

2. **Start the Node.js application:**

   ```bash
   npm run start

   ```

3. **Build application:**
   ```bash
   npm run build
   ```
