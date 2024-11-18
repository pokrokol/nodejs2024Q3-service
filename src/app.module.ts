import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Database } from './database/database.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ArtistModule,
    UserModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
  ],
  providers: [Database, PrismaService],
})
export class AppModule {}
