import { FastifyRequest, FastifyReply } from "fastify";
import { createUserSchema, loginUserSchema } from "./userSchema";
import {
    createUserService,
    loginUserService
} from "./userService";


export async function registerUserController(req: FastifyRequest, reply: FastifyReply) {

    const data = createUserSchema.parse(req.body);

    const user = await createUserService({ ...data, role: "user" });

    return reply.status(201).send(user);
}

export async function loginUserController(req: FastifyRequest, reply: FastifyReply) {
    
    const data = loginUserSchema.parse(req.body);

    const user = await loginUserService(data);

    const token = reply.jwtSign({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    
    return reply.status(201).send(token);
}




