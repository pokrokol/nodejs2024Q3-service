import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Database } from 'src/database/database.service';

@Module({
  imports: [Database],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
