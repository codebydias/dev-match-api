import z from 'zod'

export const createCommentSchema = z.object({
    content: z
        .string({
            required_error: "O conteúdo é obrigatório.",
        })
        .min(1, "O comentario não pode estar vazio.")
        .max(1000, "O conteúdo excede o limite de 1000 caracteres."),

});
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
