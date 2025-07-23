import { prisma } from "../../plugins/prisma";

type RequestFriendshipInput = {
    requester_id: number;
    target_id: number;
};

export async function listingFriendshipService(user_id: number) {

    const userExist = await prisma.users.findUniqueOrThrow({
        where: {
            id: user_id
        }
    })

    if (!userExist) {
        throw new Error("Usuario inexistente");
    }

    const listRequests = await prisma.connections.findMany({
        where: {
            target: user_id,
            status: "PENDING", // apenas as pendentes
        },
    });

    console.log(listRequests);
    return listRequests
}


export async function requestFriendshipService(requester_id: number, target_id: number) {

    if (requester_id === target_id) {
        throw new Error("Você não pode se adicionar como amigo.");
    }

    const existingConnection = await prisma.connections.findFirst({
        where: {
            OR: [
                { requester: requester_id, target: target_id },
                {
                    requester: target_id,
                    target: requester_id,
                }
            ]
        }
    })

    if (existingConnection) {

        switch (existingConnection.status) {

            case "PENDING":
                throw new Error("Já existe uma solicitação pendente entre esses usuários.");

            case "ACCEPTED":
                throw new Error("Vocês já são amigos.");

            case "REJECTED":
                return await prisma.connections.update({
                    where: { id: existingConnection.id },
                    data: { status: "PENDING", requester: requester_id, target: target_id },
                });
        }
    }

    // cria uma nova caso nao tenha
    const requestFriendship = await prisma.connections.create({
        data: {
            requester: requester_id,
            target: target_id,
            status: "PENDING",
        },
    });

    return requestFriendship;
}

export async function acceptFriendshipService(user_id: number, requester_id: number,) {
    //user_id as  target e o requester_id as quem solicitou
    const orderConnection = await prisma.connections.findFirst({
        where: { target: user_id, requester: requester_id }
    });

    if (!orderConnection) {
        throw new Error("Solicitação de amizade não encontrada.");
    }

    if (orderConnection.target !== user_id) {
        throw new Error("Você não tem permissão para aceitar esta amizade.");
    }

    if (orderConnection.status !== "PENDING") {
        throw new Error("Solicitação já foi respondida.");
    }

    return await prisma.connections.update({
        where: { id: orderConnection.id },
        data: { status: "ACCEPTED" },
    });
}

export async function rejectFriendshipService(user_id: number, requester_id: number,) {
    //user_id as  target e o requester_id as quem solicitou
    const orderConnection = await prisma.connections.findFirst({
        where: { target: user_id, requester: requester_id }
    });

    if (!orderConnection) {
        throw new Error("Solicitação de amizade não encontrada.");
    }

    if (orderConnection.target !== user_id) {
        throw new Error("Você não tem permissão para aceitar esta amizade.");
    }

    if (orderConnection.status !== "PENDING") {
        throw new Error("Solicitação já foi respondida.");
    }

    return await prisma.connections.update({
        where: { id: orderConnection.id },
        data: { status: "REJECTED" },
    });
}


