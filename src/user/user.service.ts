import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { Database } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly DBService: Database) {}

  private findUserOrFail(id: string): User {
    const user = this.DBService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private validatePassword(user: User, oldPassword: string): void {
    if (oldPassword !== user.password)
      throw new ForbiddenException('Wrong password');
  }

  findAll(): User[] {
    return this.DBService.getUsers();
  }

  findOne(id: string): User {
    const user = this.findUserOrFail(id);
    return plainToInstance(User, user);
  }

  create(createUserDto: CreateUserDto): User {
    const newUser = new User(createUserDto.login, createUserDto.password);
    this.DBService.addUser(newUser);
    return plainToInstance(User, newUser);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findUserOrFail(id);
    this.validatePassword(user, updateUserDto.oldPassword);

    user.version++;
    user.updatedAt = Date.now();
    user.password = updateUserDto.newPassword;
    this.DBService.updateUser(user);

    return plainToInstance(User, user);
  }

  remove(id: string): void {
    this.findUserOrFail(id); // Reuse helper for NotFoundException check
    this.DBService.deleteUser(id);
  }
}
