import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async findUserOrFail(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToClass(User, user);
  }

  private validatePassword(user: User, oldPassword: string): void {
    if (oldPassword !== user.password)
      throw new ForbiddenException('Wrong password');
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string): Promise<User> {
    const user = this.findUserOrFail(id);
    return plainToInstance(User, user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({ data: createUserDto });
    return plainToInstance(User, newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.findUserOrFail(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.validatePassword(await user, updateUserDto.oldPassword);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
      },
    });
    return plainToClass(User, updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = this.findUserOrFail(id); // Reuse helper for NotFoundException check
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
