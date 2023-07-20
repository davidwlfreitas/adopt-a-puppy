import fastify from 'fastify';
import { manageUsers } from '../src/routes/routes';
import { newDb } from 'pg-mem';

const testApp = fastify();
const db = newDb();

beforeAll(async () => {

  // Create necessary tables and insert some initial data for testing
  db.public.none(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      identity TEXT,
      proofOfAddress TEXT
    );

    INSERT INTO users (name, email, password)
    VALUES ('John Doe', 'john.doe@example.com', 123),
           ('Jane Smith', 'jane.smith@example.com', 123);
  `);
  await testApp.register(manageUsers, { dbPool: db });
  await testApp.ready();
});

afterAll(async () => {
  db.public.none('DROP TABLE users');
  await testApp.close();
});

test('GET /users - Get all users', async () => {
  const response = await testApp.inject({
    method: 'GET',
    url: '/users',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json());
});

test('POST /users - Add a new user', async () => {
  const newUser = {
    name: 'John David',
    email: generateUniqueEmail(),
    password: 'password',
  };

  const response = await testApp.inject({
    method: 'POST',
    url: '/users',
    payload: newUser,
  });

  expect(response.statusCode).toBe(201);
  expect(response.json());
});

function generateUniqueEmail() {
  const randomString = Math.random().toString(36).substr(2, 5);
  const timestamp = Date.now();
  return `test${randomString}${timestamp}@example.com`;
}



