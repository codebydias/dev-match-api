import fastifyCors from '@fastify/cors';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
    fastify.register(fastifyCors, {

        origin: '*', // ou ['https://app.com']

        methods: ['GET', 'POST', 'PUT'],

    });
});
