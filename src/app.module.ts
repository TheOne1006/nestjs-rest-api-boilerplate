import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    ArticlesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
