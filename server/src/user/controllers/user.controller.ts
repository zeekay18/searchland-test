import { mapPlainToInstance } from "../../lib/mappingTransforms";
import { baseProcedure, router } from "../../trpc";
import { User } from "../models/user.entity";
import { userService } from "../services/user.service";
import { CreateUserDto } from "./Dto/createUser.dto";
import { z } from "zod";

export const userController = router({
  getAll: baseProcedure.query(() => {
    return userService.getAllUsers();
  }),
  createUser: baseProcedure.input(CreateUserDto).mutation(async (opts) => {
    const { input } = opts;

    const user = mapPlainToInstance(User, input);

    const result = await userService.createUser(user);

    return result;
  }),
  deleteUserById: baseProcedure.input(z.number()).mutation(async (opts) => {
    const { input } = opts;

    await userService.deleteUserById(input);

    return "User deleted successfully";
  }),
});
