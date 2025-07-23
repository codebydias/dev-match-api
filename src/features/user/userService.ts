
import bcrypt from "bcrypt";
import { prisma } from "../../plugins/prisma";
import { CreateUserInput, LoginUserInput } from "./userSchema";


export async function createUserService(data: CreateUserInput) {
  return await prisma.users.create({ data });
}

export async function loginUserService(data: LoginUserInput) {

  const user = await prisma.users.findFirst({
    where: { email: data.email }
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const passwordValid = await bcrypt.compare(data.password, user.password);
  if (!passwordValid) {
    throw new Error("Senha incorreta");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
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

export async function myProfileService(user_id: number) {
  const profile = await prisma.users.findUniqueOrThrow({
    where: { id: user_id },
    select: {
      name: true,
      email: true,
      user_stacks: true,
      Connections_Connections_requesterToUsers: true,
      Connections_Connections_targetToUsers: true,
    },
  });

  return profile;
}


