import { NotFoundException } from '@nestjs/common';

import {
  Column,
  DataType,
  Model as OriginModel,
  // HasMany,
} from 'sequelize-typescript';
import { FindOptions } from 'sequelize';

/**
 * 扩展常用的 Model 方法
 *
 */
export abstract class Model<T = any, T2 = any> extends OriginModel<T, T2> {
  constructor(values?: any, options?: any) {
    super(values, options);
  }

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.DATE, allowNull: true, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true, field: 'updated_at' })
  updatedAt: Date;

  @Column({ type: DataType.DATE, field: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  version: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, field: 'is_deleted' })
  isDeleted: boolean;

  /**
   * 查找一个实例, 未找到则报错
   * @param {FindOptions} options
   * @returns Promise
   */
  public static async findOneOrFail<M extends Model<M>>(
    this: { new (): M } & typeof Model,
    options?: FindOptions,
  ): Promise<M> {
    const instance = await this.findOne(options);
    if (!instance) {
      throw new NotFoundException(`Not found instance about ${JSON.stringify(options)}`);
    }
    return instance as M
  }

  /**
   * 根据id查找一个实例, 未找到则报错
   * @param {FindOptions} options
   * @returns Promise
   */
  public static async findByPkOrFail<M extends Model<M>>(
    this: { new (): M } & typeof Model,
    id: number,
  ): Promise<M> {
    const instance = await this.findOneOrFail({ where: { id }});

    return instance as M;
  }
}
