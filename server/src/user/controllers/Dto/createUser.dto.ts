import { z } from "zod";

export const CreateUserDto = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  age: z.number().min(0).max(120),
});

export type ICreateUserDto = z.infer<typeof CreateUserDto>;
