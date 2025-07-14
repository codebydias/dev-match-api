import { FastifyInstance } from "fastify";
import { userRoutes } from "../features/user/userRoute";


export async function userRouter(fastify: FastifyInstance) {
    fastify.register(userRoutes, { prefix: "/users" });
}
