// routes/exampleRoute.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from "@prisma/client";
import z from "zod";

const prisma = new PrismaClient();

export async function getUsers(fastify: FastifyInstance) {
    fastify.get('/users', async (request: FastifyRequest) => {
        const users = await prisma.user.findMany();
        return users;
    });
}
  
export async function createUser(fastify: FastifyInstance) {
    fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const createUserSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string(),
        });

        const { name, email, password } = createUserSchema.parse(request.body);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        });

        reply.status(201).send(user);
    });
}

export async function updateUser(fastify: FastifyInstance) {
    fastify.put('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const updateUserSchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().optional(),
        });
    
        const { name, email, password } = updateUserSchema.parse(request.body);
    
        const { id } = request.params as { id?: string } || { id: null };
        
        let user = null;
        if(id){
            user = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name,
                    email,
                    password,
                }
            });
        } else {
            reply.status(404).send();
        }
    
        reply.status(200).send(user);
    });
}

export async function getPuppies(fastify: FastifyInstance) {
    fastify.get('/puppies', async (request: FastifyRequest, reply: FastifyReply) => {
        const { searchQuery, filterBy } = request.query as { searchQuery?: string, filterBy?: string } || { searchQuery: null, filterBy: null };

        try {
            let puppies = null;
            let searchConditions = [];
            if(searchQuery){
                searchConditions.push({name: {
                    contains: searchQuery,
                }});
                searchConditions.push({breed: {
                    contains: searchQuery,
                }});
                searchConditions.push({breed: {
                    contains: searchQuery,
                }});
                searchConditions.push({gender: {
                    contains: searchQuery,
                }});
                searchConditions.push({size: {
                    contains: searchQuery,
                }});
            }
    
    
            if (filterBy) {
                const [filterField, filterValue] = filterBy.split(':');
        
                if (filterField && filterValue) {
                    searchConditions.push({
                        [filterField]: filterValue
                    })
                }
            }
    
            if(searchConditions.length > 0){
                puppies = await prisma.puppy.findMany({
                    where: {
                        OR: searchConditions
                    }
                });
            } else {
                puppies = await prisma.puppy.findMany();
            }
    
            reply.send(puppies);
    
        } catch (error) {
            reply.status(500).send({ error: 'An error occurred while processing the request.' });
        }
    });
}

export async function getPuppy(fastify: FastifyInstance) {
    fastify.get('/puppies/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id?: string } || { id: null };

        let puppy = null;
        if(id){
            puppy = await prisma.puppy.findUnique({
                where: {
                    id: Number(id),
                },
                include: { adoptions: true }
            });
        } else {
            reply.status(404).send();
        }

        reply.status(200).send(puppy);
    });
}

export async function createPuppy(fastify: FastifyInstance) {
    fastify.post('/puppies', async (request: FastifyRequest, reply: FastifyReply) => {
        const createPuppySchema = z.object({
            name: z.string(),
            breed: z.string(),
            age: z.number().optional(),
            gender: z.string(),
            size: z.string().optional(),
            traits: z.string().optional(), 
            photo: z.string().optional(),
            isVaccinated: z.boolean().optional(),
            isNeutered: z.boolean().optional(),
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
}

export async function updatePuppy(fastify: FastifyInstance) {
    fastify.put('/puppies/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const updatePuppySchema = z.object({
            name: z.string().optional(),
            breed: z.string().optional(),
            age: z.number().optional(),
            size: z.string().optional(),
            traits: z.string().optional(),
            photo: z.string().optional(),
            isVaccinated: z.boolean().optional(),
            isNeutered: z.boolean().optional(),
        });
    
        const { name, breed, age, size, traits, photo, isVaccinated, isNeutered } = updatePuppySchema.parse(request.body);
    
        const { id } = request.params as { id?: string } || { id: null };
        
        let puppy = null;
        if(id){
            puppy = await prisma.puppy.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name,
                    breed,
                    age,
                    size,
                    traits,
                    photo,
                    isVaccinated,
                    isNeutered,
                }
            });
        } else {
            reply.status(404).send();
        }
    
        reply.status(200).send(puppy);
    });
}

export async function deletePuppy(fastify: FastifyInstance) {
    fastify.delete('/puppies/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id?: string } || { id: null };

        if(id){
            await prisma.puppy.delete({
                where: {
                    id: Number(id),
                }
            });
        } else {
            reply.status(404).send();
        }

        reply.status(204).send();
    });
}

export async function adoptPuppy(fastify: FastifyInstance) {
    fastify.post('/puppies/adoption', async (request: FastifyRequest, reply: FastifyReply) => {
        const createAdoptionSchema = z.object({
            puppyId: z.number(),
            userId: z.number(),
        });
    
        const { puppyId, userId } = createAdoptionSchema.parse(request.body);
    
        const adoption = await prisma.adoption.create({
            data: {
                puppyId,
                userId,
            }
        });
    
        reply.status(201).send(adoption);
    });
}
