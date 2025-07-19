import { prisma } from "../../plugins/prisma";
import { CreatePostInput, PatchPostInput } from "./feedSchema";

export async function createPostService(user_id: number, data: CreatePostInput) {

    const userExist = await prisma.users.findFirst({
        where: {
            id: user_id
        }
    })

    if (!userExist) {
        throw new Error("Crie uma conta primeiro para poder participar");
    }

    const post = await prisma.posts.create({
        data: {
            content: data.content,
            Users: {
                connect: { id: user_id }
            }
        },
    });

    return post;
}

export async function getPostService() {

    const loadFeed = await prisma.posts.findMany({
        orderBy: {
            created_at: "desc",
        },
        include: {
            Users: {
                select: {
                    id: true,
                    name: true,
                    avatar_url: true,
                },
            },
        },
    });

    return loadFeed;
}

export async function getPostByIdService(id: number) {

    const post = await prisma.posts.findUnique({
        where: {
            id: id
        }, include: {
            Users: {
                select: { id: true, name: true }
            }
        },
    })

    if (!post) {
        throw new Error("Post não encontrado");
    }

    return post
}

export async function patchPostByIdService(id: number, user_id: number, data: PatchPostInput) {

    const post = await prisma.posts.findUnique({
        where: { id: id }
    })

    if (!post || post.user_id !== user_id) {
        throw new Error("Post não encontrado ou você não tem permissão");
    }

    if (!data.content || data.content.trim() === "") {
        throw new Error("Conteúdo do post não pode estar vazio");
    }


    const patchPost = await prisma.posts.update({
        data: {
            content: data.content ?? post.content,
        }, where: {
            id: id,
            user_id: user_id
        }
    })

    return patchPost

}
