import {
  // WhereOptions,
  FindOptions } from 'sequelize';

import { Model } from './base.model';
// import { Model } from '../../entities/base.model';

/**
 * interface of BaseService
 * @class
 */
export interface IBaseService<M extends Model<M>> {
  // readonly logger: Logger;
  findByPk(
    identifier: number,
    options?: Omit<FindOptions, 'where'>,
  ): Promise<M | null>;

  findByPkOrFail(
    identifier: number,
    options?: Omit<FindOptions, 'where'>,
  ): Promise<M | null>;
}
