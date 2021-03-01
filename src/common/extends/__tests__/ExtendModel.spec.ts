import { Test, TestingModule } from '@nestjs/testing';

import {
  getModelToken,
  SequelizeModule } from '@nestjs/sequelize';

import { Part } from '../../../textbooks/entities/part.entity';
import { CoreModule } from '../../../core/core.module';

describe('extends ExtendModel', () => {
  let CurModel: typeof Part;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        SequelizeModule.forFeature([Part]),
      ],
    }).compile();

  CurModel = moduleRef.get(getModelToken(Part));
  });

  describe('base test', () => {
    it('should be defined', () => {
      expect(CurModel).toBeDefined();
    });
  });

  describe('findOneOrFail', () => {
    it('should throw error', async () => {
      let err: any;
      try {
        await CurModel.findOneOrFail({
          where: {
            id: 100000,
          }
        })
      } catch (error) {
        err = error;
      }

      expect(err.message).toMatch('Not found instance about');
    });

    it('should match', async () => {
      const instance = await CurModel.findOneOrFail({
        where: {
          id: 1301,
        }
      });

      const expected = {
        id: 1301,
      }

      expect(instance.toJSON()).toMatchObject(expected);
    });
  });

  describe('findByPkOrFail', () => {
    it('should throw error', async () => {
      let err: any;
      try {
        await CurModel.findByPkOrFail(100000)
      } catch (error) {
        err = error;
      }

      expect(err.message).toMatch('Not found instance about');
    });

    it('should match', async () => {
      const instance = await CurModel.findByPkOrFail(1301);

      const expected = {
        id: 1301,
      }

      expect(instance.toJSON()).toMatchObject(expected);
    });
  });

});
