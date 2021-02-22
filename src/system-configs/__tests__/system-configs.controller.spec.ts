import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { SystemConfigsController } from '../system-configs.controller';
import { SystemConfigsService } from '../system-configs.service';
import { AuthService } from '../../common/auth/auth.service';

const serviceMock = {
  create: jest.fn().mockImplementation(() => ({
    _id: '123',
    title: '123',
  })),
  findAll: jest.fn().mockImplementation(() => []),
  findOne: jest.fn().mockImplementation(() => ({})),
  remove: jest.fn().mockImplementation(() => ({})),
};

const checkServiceMock = {
  create: jest.fn().mockImplementation(() => ({
    id: '123',
    roles: ['admin'],
  })),
};


const cacheManagerMock = {
  test: jest.fn().mockImplementation(() => ({})),
};

describe('SystemConfigsController', () => {
  let controller: SystemConfigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemConfigsController],
      providers: [
        {
          provide: SystemConfigsService,
          useValue: serviceMock,
        },
        {
          provide: AuthService,
          useValue: checkServiceMock,
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheManagerMock,
        },
      ],
    }).compile();

    controller = module.get<SystemConfigsController>(
      SystemConfigsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
