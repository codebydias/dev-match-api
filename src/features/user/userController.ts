import { FastifyRequest, FastifyReply } from "fastify";
import { createUserSchema, loginUserSchema } from "./userSchema";
import bcrypt from "bcrypt";
import {
    createUserService,
    getMyPostService,
    loginUserService,
    myProfileService
} from "./userService";
import { prisma } from "../../plugins/prisma";


export async function registerUserController(req: FastifyRequest, reply: FastifyReply) {

    const data = createUserSchema.parse(req.body);

    const userExist = await prisma.users.findFirst({
        where: {
            email: data.email
        }
    })

    if (userExist) {
        return reply.status(400).send({
            message: 'Este e-mail já está em uso.'
        });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await createUserService({ ...data, password: hashedPassword });

    return reply.status(201).send({
        message: `Parabéns por se tornar parte da família, ${user.name}!`
    });


}

export async function loginUserController(req: FastifyRequest, reply: FastifyReply) {

    const data = loginUserSchema.parse(req.body);

    const user = await loginUserService(data);

    if (!user) {
        return reply.status(401).send({
            message: "Credenciais inválidas.",
        });
    }

    const token = await reply.jwtSign({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return reply.status(200).send({
        message: `Login realizado com sucesso ${user.name}.`,
        token,
    });

}

export async function getMyPostController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const userId = user?.id;

        if (!userId) {
            return reply.code(401).send({ message: `Usúario não encontrado ${userId}` });
        }

        const loadPosts = await getMyPostService(userId);

        return reply.send(loadPosts);
    } catch (err) {
        console.error("Erro ao carregar postagens:", err);
        return reply.code(500).send({ message: "Erro interno ao carregar postagens" });
    }
}

export async function myProfileController(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = req.user as { id: number; email: string; role: string };
        const userId = user?.id;

        if (!userId) {
            return reply.code(401).send({ message: `Usúario não encontrado ${userId}` });
        }

        const loadProfile = await myProfileService(userId);

        return reply.send(loadProfile);
    } catch (err) {
        console.error("Erro ao carregar postagens:", err);
        return reply.code(500).send({ message: "Erro interno ao carregar postagens" });
    }
}

