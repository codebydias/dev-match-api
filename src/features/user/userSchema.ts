import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha precisa ter pelo menos 6 caracteres"),
    role: z.string().max(20).optional().default("user")
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória")
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;