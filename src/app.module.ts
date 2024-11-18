import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

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
  providers: [PrismaService],
})
export class AppModule {}
