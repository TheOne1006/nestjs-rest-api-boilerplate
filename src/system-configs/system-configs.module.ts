import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemConfigsController } from './system-configs.controller';
import { SystemConfig } from './system-config.entity';
import { SystemConfigsService } from './system-configs.service';

@Module({
  imports: [
    SequelizeModule.forFeature([SystemConfig]),
  ],
  controllers: [SystemConfigsController],
  providers: [SystemConfigsService],
  exports: [SystemConfigsService],
})
export class SystemConfigsModule {}
