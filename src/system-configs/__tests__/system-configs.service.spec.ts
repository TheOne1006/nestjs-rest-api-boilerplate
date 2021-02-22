import { Test, TestingModule } from '@nestjs/testing';
import { SystemConfigsService } from '../system-configs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemConfig } from '../system-config.entity'
import { CoreModule } from '../../core/core.module'


describe('SystemConfigsController', () => {
  let service: SystemConfigsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        SequelizeModule.forFeature([SystemConfig])
      ],
      providers: [
        SystemConfigsService,
      ],
    }).compile();

    service = moduleRef.get<SystemConfigsService>(SystemConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
