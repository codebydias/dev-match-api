import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (fastify) => {

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "SUPERSECRETKEYINMYAPPMOTH3RFUCK3R",
    sign: { expiresIn: '48h' }
  });

});
