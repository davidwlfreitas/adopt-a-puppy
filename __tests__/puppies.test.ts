import fastify from 'fastify';
import { managePuppies } from '../src/routes/routes';
import { newDb } from 'pg-mem';

const testPuppyApi = fastify();
const db = newDb();

beforeAll(async () => {
  // Create necessary tables and insert some initial data for testing
  db.public.none(`
    CREATE TABLE puppy (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      breed TEXT NOT NULL,
      gender TEXT NOT NULL,
      age INTEGER,
      isVaccinated BOOLEAN,
      isNeutered BOOLEAN,
      size TEXT,
      traits TEXT,
      photo TEXT,
      medicalHistory TEXT,
      adoptionRequirements TEXT
    );

    INSERT INTO puppy (id, name, breed, gender)
    VALUES (33, 'Ziggy', 'Poodle','male'),
           (34, 'Cassie', 'Poodle', 'female');
  `);

  await testPuppyApi.register(managePuppies, { dbPool: db });
  await testPuppyApi.ready();
});

afterAll(async () => {
  db.public.none('DROP TABLE puppy');
  await testPuppyApi.close();
});

test('GET /puppies - Get all puppies', async () => {
  const response = await testPuppyApi.inject({
    method: 'GET',
    url: '/puppies',
  });

  expect(response.statusCode).toBe(200);
  expect(response.json());
});

test('POST /puppies - Add a new puppy', async () => {
  const newPuppy = {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 2,
    gender: 'male',
    size: 'large',
    traits: 'loyal, friendly, intelligent',
    photo: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_550.jpg',
    isVaccinated: true,
    isNeutered: true,
  };

  const response = await testPuppyApi.inject({
    method: 'POST',
    url: '/puppies',
    payload: newPuppy,
  });

  expect(response.statusCode).toBe(201);
  expect(response.json());
});

test('PUT /puppies/:id - Update an existing puppy', async () => {
  const puppyIdToUpdate = 1;
  const updatedPuppy = {
    name: 'Max',
    photo: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_10947.jpg',
    breed: 'German Shepherd',
    age: 3,
    size: 'large',
    gender: 'male',
    traits: 'loyal, intelligent, confident, courageous',
    isNeutered: true,
    isVaccinated: true,
    adoptionRequirements: 'Must have a big yard.',
    medicalHistory: 'None',
    createdAt: '2021-08-01T00:00:00.000Z',
    updatedAt: '2021-08-01T00:00:00.000Z',
  };

  const response = await testPuppyApi.inject({
    method: 'PUT',
    url: `/puppies/${puppyIdToUpdate}`,
    payload: updatedPuppy,
  });

  expect(response.statusCode).toBe(200);
  expect(response.json());
});
