import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import z from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get('/users', async (request, reply) => {
    const users = await prisma.user.findMany();
    return users;
});

app.get('/puppies', async (request, reply) => {
    const puppies = await prisma.puppy.findMany();
    return puppies;
});

app.post('/puppies', async (request, reply) => {
    const createPuppySchema = z.object({
        name: z.string(),
        breed: z.string(),
        age: z.number().optional(),
    });

    const { name, breed } = createPuppySchema.parse(request.body);

    const puppy = await prisma.puppy.create({
        data: {
            name,
            breed,
            age: 0,
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
    