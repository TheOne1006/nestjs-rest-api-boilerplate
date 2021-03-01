import { map } from 'lodash';
import { Injectable, Inject } from '@nestjs/common';
import {
  Sequelize,
} from 'sequelize';
// import { WhereOptions } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './article.entity';


import {
  ArticleDto,
  CreateArticleDto,
  UpdateArticleDto,
} from './dtos';

// import { FindOptions } from 'sequelize';
import { BaseService } from '../common/extends/base.service';
import { IBaseService } from '../common/extends/base.service.interface';

@Injectable()
export class ArticleService extends BaseService<Article>
  implements IBaseService<Article> {
  constructor(
    @Inject('Sequelize')
    protected readonly sequelize: Sequelize,
    @InjectModel(Article)
    protected readonly articleModel: typeof Article,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(articleModel);
  }

  /**
   * 创建实例
   * @param  {CreateArticleDto} createDto
   */
  async create(
    createDto: CreateArticleDto,
  ) {
    const data = new this.articleModel(createDto);

    const instance = await data.save();

    return instance;
  }

  /**
   * 更新信息
   */
  async updateByPk(
    id: number,
    updateDto: UpdateArticleDto,
    ) {
    const data = await this.articleModel.findByPkOrFail(id);

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
   * 搜索
   */
  async search(
    pageSize: number,
    page: number,
    attrsMatch: Record<string, ArticleDto> = {},
    ) {
      const offset = Math.max(0, page - 1) * pageSize;

      return this.articleModel.findAll({
        where: {
          ...attrsMatch,
        } as any,
        // raw: true,
        limit: pageSize,
        offset: offset,
        // subQuery: true,
        // 排序, 默认id 排序
        // order: [['id', 'asc']],
      });
  }

  /**
   * 搜索 统计
   * @param {Record<string, TextbookDto>} attrsMatch 匹配字段
   */
  async searchCount(
    attrsMatch: Record<string, ArticleDto> = {},
  ) {
    return this.articleModel.count({
      where: {
        ...attrsMatch,
      } as any,
    });
  }

}
