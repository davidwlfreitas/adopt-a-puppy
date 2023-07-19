import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as routes from './routes/routes';


const app = Fastify();
app.register(cors);
app.register(helmet);

for (const routeHandler of Object.values(routes)) {
    app.register(routeHandler);
}

app.listen({ 
    host: '0.0.0.0', 
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log('Server is running');
})
    