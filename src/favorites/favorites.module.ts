import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Database } from 'src/database/database.service';

@Module({
  imports: [Database],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
