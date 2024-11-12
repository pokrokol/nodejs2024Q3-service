import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Database } from './database/database.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ArtistModule,
    UserModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    DatabaseModule,
  ],
  providers: [Database],
})
export class AppModule {}
