import { FastifyInstance } from "fastify";
import { feedRoutes } from "../features/feed/feedRoute";


export async function feedRouter(fastify: FastifyInstance) {
    fastify.register(feedRoutes, { prefix: "/feed" });
}
