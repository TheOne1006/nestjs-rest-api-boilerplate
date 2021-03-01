/**
 * @Author: wbj
 * @Date: 2021-01-22 17:48:00
 * @Last Modified by: wbj
 * @Last Modified time: 2021-03-01 14:31:33
 *
 *
 */

// import { Transaction, Op } from 'sequelize';
import { Logger } from 'winston';
import {
  // WhereOptions,
  FindOptions,
} from 'sequelize';

import { Model } from './base.model';

/**
 * 设置基础BaseSerive
 *
 * @example
 * class ArticleService extends BaseService<Article> implements IBaseService<Article> {
 *  something() {}
 * }
 *
 */
export abstract class BaseService<M extends Model<M>> {
  protected readonly mainModel: { new (): M } & typeof Model;
  protected readonly logger: Logger;
  constructor(mainModel: { new (): M } & typeof Model) {
    this.mainModel = mainModel;
  }

  /**
   * 根据主键查找实例
   *
   * @param  {number} id
   * @param  {FindOptions} options?
   * @returns Promise<instance>
   */
  async findByPk(
    id: number,
    options?: FindOptions,
  ): Promise<M> {
    const instance = await this.mainModel.findByPk(id, options);
    return instance as M;
  }

  /**
   * 根据主键查找实例
   *
   * @param  {number} id
   * @param  {FindOptions} options?
   * @returns Promise<instance>
   */
  async findByPkOrFail(
    id: number,
  ): Promise<M> {
    const instance = await this.mainModel.findByPkOrFail(id);
    return instance as M;
  }

  /**
   * 删除
   */
  async removeByPk(
    id: number,
  ): Promise<M> {
    const data = await this.mainModel.findByPkOrFail(id);

    data.isDeleted = true;
    data.deletedAt = new Date();

    const instance = await data.save();

    return instance as M;
  }

}
