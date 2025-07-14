import "@fastify/jwt";

declare module "fastify" {
    interface FastifyInstance {
        jwt: import("@fastify/jwt").FastifyJWT;
    }

    interface FastifyRequest {
        jwtVerify: FastifyInstance["jwt"]["verify"];
        user: { sub: string }; // tudo oq vem no jwt { Para tratar dados sensiveis do usuario} REFAT
    }

    interface FastifyReply {
        jwtSign: FastifyInstance["jwt"]["sign"];
    }
}
