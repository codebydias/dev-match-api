import { FastifyInstance } from "fastify";
import { connectionRoutes } from "../features/connections/connectionRoute";



export async function connectionRouter(fastify: FastifyInstance) {
    fastify.register(connectionRoutes, { prefix: "/connections" });
}
