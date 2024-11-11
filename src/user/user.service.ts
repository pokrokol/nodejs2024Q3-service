import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Database } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly database: Database) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
    const isUserExists = this.database.users.some(
      (user) => user.login === newUser.login,
    );

    if (isUserExists) {
      throw new HttpException(
        'User with the same login already exists',
        HttpStatus.CONFLICT,
      );
    }
    this.database.users.push(newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.database.users;
  }

  async getUserById(userId: string): Promise<User> {
    const foundUser = this.database.users.find((user) => user.id === userId);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return foundUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userToUpdate = await this.getUserById(userId);

    if (userToUpdate.password !== updateUserDto.oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
    }

    userToUpdate.password = updateUserDto.newPassword;
    userToUpdate.version += 1;
    userToUpdate.updatedAt = Date.now();

    return userToUpdate;
  }

  async deleteUser(userId: string): Promise<void> {
    const userToDelete = await this.getUserById(userId);
    const userIndex = this.database.users.findIndex(
      (user) => user.id === userToDelete.id,
    );

    if (userIndex !== -1) {
      this.database.users.splice(userIndex, 1);
    }
  }
}
