import { Repository } from "typeorm";
import { dataSource } from "../../database";
import { User } from "../models/user.entity";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(user: User) {
    return await this.userRepository.save(user);
  }

  async deleteUserById(id: number) {
    return await this.userRepository.delete(id);
  }
}

const userRepository = dataSource.getRepository(User);
export const userService = new UserService(userRepository);
