import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { SystemConfigsModule } from './system-configs/system-configs.module';

@Module({
  imports: [CoreModule, UsersModule, SystemConfigsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
