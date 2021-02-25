import { map } from 'lodash';
import { Injectable, Inject } from '@nestjs/common';
import {
  Sequelize,
} from 'sequelize';
// import { WhereOptions } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectModel } from '@nestjs/sequelize';
import {
  Material,
  Textbook,
  Unit,
} from '../entities';


import {
  CreateMaterialDto,
  UpdateMaterialDto,
} from '../dto';

// import { FindOptions } from 'sequelize';
import { BaseService, IBaseService } from './base';

@Injectable()
export class MaterialService extends BaseService<Material>
  implements IBaseService<Material> {
  constructor(
    @Inject('Sequelize')
    protected readonly sequelize: Sequelize,
    @InjectModel(Material)
    protected readonly materialModel: typeof Material,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(materialModel);
  }

  /**
   * 创建实例, 后进行排序
   * @param  {Textbook} belongTextbook
   * @param  {Unit} belongUnit
   * @param  {number} sorting
   * @param  {CreateMaterialDto} createDto
   */
  async createBelong(
    belongTextbook: Textbook,
    belongUnit: Unit,
    sorting: number,
    createDto: CreateMaterialDto & { videoDuration?: number },
  ) {
    const data = new this.materialModel({
      ...createDto,
      subjectId: belongTextbook.subjectId,
      textbookId: belongTextbook.id,

      // 覆盖数据
      unitType: belongUnit.type,
      partId: belongUnit.partId,
      directoryId: belongUnit.directoryId,
      unitId: belongUnit.id,
      sorting,
    });

    const transaction = await this.sequelize.transaction();
    try {
      const instance = await data.save({ transaction });

      await this.afterSetSortingHook(
        instance.id,
        sorting,
        {
          textbookId: belongTextbook.id,
          partId: instance.partId,
          unitId: instance.unitId,
        },
        transaction,
      );

      await transaction.commit();
      return instance;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * TODO: updateDto 禁止存在 textbookId
   * 更新目录自身信息(不包括调换顺序)
   */
  async updateSelfBelong(
    textbookId: number,
    id: number,
    updateDto: UpdateMaterialDto,
    ) {
    const data = await this.materialModel.findOne({
      where: {
        id,
        textbookId,
      },
    });

    let needsUpdate = false;
    map(updateDto, (value: any, key: string) => {
      const originalValue = data.get(key);
      if (value !== originalValue) {
        needsUpdate = true;
        data[key] = value;
      }
    });

    return needsUpdate ? data.save() : data;
  }

  /**
   * 顺序调整,仅当前目录有效
   * @param textbookId
   * @param directoryId
   * @param id
   * @param targetPartId
   * @param targetUnitId
   * @param targetSort
   */
  async reorderBelong(
    textbookId: number,
    id: number,
    targetSort: number,
    targetPartId: number,
    targetUnitId: number,
  ) {
    const data = await this.materialModel.findOneOrFail({
      where: {
        textbookId,
        id,
      },
    });

    data.partId = targetPartId;
    data.unitId = targetUnitId;
    data.sorting = targetSort;

    const transaction = await this.sequelize.transaction();
    try {
      const instance = await data.save({ transaction });

      await this.afterSetSortingHook(
        instance.id,
        instance.sorting,
        {
          textbookId,
          partId: instance.partId,
          unitId: instance.unitId,
        },
        transaction,
      );

      await transaction.commit();
      return instance;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
