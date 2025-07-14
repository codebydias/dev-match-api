
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

  const passwordCompare = await bcrypt.compare(data.password, user.password);
  if (!passwordCompare) {
    throw new Error("Senha incorreta");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

