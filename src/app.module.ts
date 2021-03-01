import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { SystemConfigsModule } from './system-configs/system-configs.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    SystemConfigsModule,
    ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
