import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import z from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get('/users', async () => {
    const users = await prisma.user.findMany();
    return users;
});

app.get('/puppies', async () => {
    const puppies = await prisma.puppy.findMany();
    return puppies;
});

app.post('/puppies', async (request, reply) => {
    const createPuppySchema = z.object({
        name: z.string(),
        breed: z.string(),
        age: z.number(),
        gender: z.string(),
        size: z.string(),
        traits: z.string(), 
        photo: z.string(),
        isVaccinated: z.boolean(),
        isNeutered: z.boolean(),
    });

    const { name, breed, age, gender, size, traits, photo, isVaccinated, isNeutered } = createPuppySchema.parse(request.body);

    const puppy = await prisma.puppy.create({
        data: {
            name,
            breed,
            age,
            gender,
            size,
            traits,
            photo,
            isVaccinated,
            isNeutered,
        }
    });
    
    reply.status(201).send(puppy);
});

app.listen({ 
    host: '0.0.0.0', 
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log('Server is running');
})
    