import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  login: string;
  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor({ login, password }: Partial<User>) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
