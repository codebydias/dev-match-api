import { z } from "zod";

export const createPostSchema = z.object({
    content: z
        .string({
            required_error: "O conteúdo é obrigatório.",
        })
        .min(1, "O post não pode estar vazio.")
        .max(3000, "O conteúdo excede o limite de 3000 caracteres."),

    // visibility: z
    //     .enum(["public", "private"])
    //     .default("public")
    //     .optional(),
});
export type CreatePostInput = z.infer<typeof createPostSchema>;