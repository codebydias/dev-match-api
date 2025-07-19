import { prisma } from "../../plugins/prisma";
import { CreateCommentInput } from "./commentSchema";

export async function createCommentService(user_id: number, post_id: number, data: CreateCommentInput) {
    const post = await prisma.posts.findUnique({ where: { id: post_id } });
    if (!post) throw new Error("Post não encontrado");

    const comment = await prisma.comments.create({
        data: {
            content: data.content,
            user_id: user_id,
            post_id: post_id
        },
    });

    return comment;
}

export async function getCommentService(post_id: number) {

    const post = await prisma.posts.findUnique({ where: { id: post_id } });
    if (!post) throw new Error("Post não encontrado");

    const getComments = await prisma.comments.findMany({
        where: {
            post_id: post_id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar_url: true
                }
            },
            post: {
                select: {
                    user_id: true
                }
            }
        }
    });

    console.log(getComments);


    return getComments;
}
