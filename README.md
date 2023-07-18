
---
# Puppy Adoption Management Backend

An application for managing the adoption of puppies. This backend project is built using TypeScript, Node.js, Fastify, Zod, Prisma, and is deployed using Render.

## Prerequisites

Make sure you have the following installed before running this project:

- Node.js (v18)
- npm (Node Package Manager)
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Change into the project's directory:

```bash
cd adopt-a-puppy
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and configure the database connection:

```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database-name>
```

## Database Setup

1. Start the PostgreSQL database using Docker:

```bash
docker run -d --name puppy-database -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=<database-name> -p 5432:5432 postgres
```

2. Run the database migrations:

```bash
npx prisma migrate dev
```

## Running the App

1. Start the server:

```bash
npm run dev
```

2. The API should now be available at `http://localhost:3000`.

## Deploying to Render

1. Create an account on [Render](https://render.com) and set up a new service.

2. Configure a PostgreSQL database and take note of the connection URL.

3. Set up the following environment variables on Render:

- `DATABASE_URL`: The PostgreSQL connection URL.

4. Push the code to your Render service repository.

5. Render will automatically build and deploy the application.

---

Feel free to customize the instructions provided based on your specific project setup or requirements.
--------
