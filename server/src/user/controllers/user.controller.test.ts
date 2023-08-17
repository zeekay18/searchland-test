import { AppRouter, appRouter, createTRPCContext } from "../../trpc";
import { User } from "../models/user.entity";
import { userService } from "../services/user.service";
import { ICreateUserDto } from "./Dto/createUser.dto";

jest.mock("../services/user.service");

describe("UserController", () => {
  let ctx: ReturnType<typeof createTRPCContext>;
  let caller: ReturnType<AppRouter["createCaller"]>;

  beforeEach(() => {
    ctx = createTRPCContext({} as any);

    caller = appRouter.createCaller(ctx);
  });

  it("should get all users", async () => {
    const users = [{ id: 1, name: "John" }];

    jest.spyOn(userService, "getAllUsers").mockResolvedValueOnce(users as any);

    const result = await caller.user.getAll();

    expect(result).toEqual(users);
  });

  it("should create a user", async () => {
    const userDto: ICreateUserDto = {
      firstName: "John",
      lastName: "Doe",
      age: 12,
    };

    const createdUser: User = {
      id: 1,
      ...userDto,
    };

    jest.spyOn(userService, "createUser").mockResolvedValueOnce(createdUser);

    const result = await caller.user.createUser(userDto);

    expect(result).toBe(createdUser);

    expect(userService.createUser).toBeCalled();
  });

  it("should delete a user", async () => {
    const userId = 1;

    jest.spyOn(userService, "deleteUserById").mockResolvedValueOnce({} as any);

    const result = await caller.user.deleteUserById(userId);

    expect(result).toEqual("User deleted successfully");

    expect(userService.deleteUserById).toBeCalledWith(userId);
  });
});
