import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ArtistModule,
    UserModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    LoggerModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
