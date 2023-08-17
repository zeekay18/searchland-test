import { DataSource } from "typeorm";
import { User } from "../user/models/user.entity";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  entities: [User],
});
