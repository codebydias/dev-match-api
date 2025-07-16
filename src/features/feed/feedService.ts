import { prisma } from "../../plugins/prisma";
import { CreatePostInput } from "./feedSchema";

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

export async function getMyPostService(user_id: number) {

    const loadMyPosts = await prisma.posts.findMany({
        orderBy: {
            created_at: "desc",
        },
        where: {
            user_id: user_id
        }
    });

    return loadMyPosts;
}
