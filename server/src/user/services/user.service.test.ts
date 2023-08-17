import { UserService } from "./user.service";
import "reflect-metadata";

import { User } from "../models/user.entity";

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const mockUserRepository: any = {
        find: jest.fn().mockResolvedValue([{ id: 1, name: "John" }]),
      };

      const userService = new UserService(mockUserRepository);
      const users = await userService.getAllUsers();
      expect(users).toEqual([{ id: 1, name: "John" }]);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });

    it("should create a user", async () => {
      const mockUserRepository: any = {
        save: jest.fn().mockResolvedValueOnce({ id: 1, name: "John" }),
      };

      const user: User = {
        id: 0,
        firstName: "John",
        lastName: "Doe",
        age: 123,
      };

      const userService = new UserService(mockUserRepository);
      const result = await userService.createUser(user);

      expect(result).toBeDefined();
      expect(mockUserRepository.save).toBeCalled();
    });

    it("should delete a user", async () => {
      const mockUserRepository: any = {
        delete: jest.fn().mockResolvedValueOnce({ id: 1, name: "John" }),
      };

      const userId = 1;

      const userService = new UserService(mockUserRepository);
      const result = await userService.deleteUserById(userId);

      expect(result).toBeDefined();
      expect(mockUserRepository.delete).toBeCalledWith(userId);
    });
  });
});
