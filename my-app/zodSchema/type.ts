import { z } from "zod";

export const signUp = z.object({
    name: z.string().min(1, "Name cannot be empty."),
    age: z.string().min(1, "Age cannot be empty.").regex(/^\d+$/, "Age must contain only numbers"),
    education: z.string().min(1,"Education cannot be empty."),
})