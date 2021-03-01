import {
  Body,
  // Request,
  // Req,
  Controller,
  Get,
  Post,
  Delete,
  UseInterceptors,
  Put,
  Param,
  UseGuards,
  Query,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import {
  ArticleDto,
  CreateArticleDto,
  UpdateArticleDto,
  ReqDataCountDto,
} from './dtos'


import { ArticleService } from './article.service';

@Controller('v1/articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(
    protected readonly articleService: ArticleService,
  ) {}

  /**
   * 查看 列表
   *
   * @param where 搜索 条件
   * @param page 当前页
   * @param pageSize 每页展示数据条数
   */
  @Get()
  @ApiOperation({
    summary: '搜索文章列表'
  })
  @ApiQuery({
    name: 'where[classification]',
    description: '类型',
    example: 'computer',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: '当前页',
    example: 1,
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'pageSize',
    description: '当前页',
    example: 10,
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'where',
    description: 'where 汇总',
    type: String,
    required: false,
  })
  async search(
    @Query('where') where: any,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    ): Promise<ArticleDto[]> {
      const {
        classification,
      } = where;

      const list = await this.articleService.search(
        pageSize || 10,
        page || 1,
        {
          ...(classification ? { classification } : {}),
        } as Record<string, ArticleDto>,
      );

      return list;
  }

  /**
   * 统计 总数
   *
   * @param where 搜索 条件
   * @param page 当前页
   * @param pageSize 每页展示数据条数
   */
  @Get('count')
  @ApiOperation({ summary: '搜索教程统计' })
  @ApiQuery({
    name: 'where[classification]',
    description: '类型',
    example: 'computer',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'where',
    description: 'where 汇总',
    type: String,
    required: false,
  })
  async countTotal(
    @Query('where') where: any,
    ): Promise<ReqDataCountDto> {
      const count = await this.articleService.searchCount(where);

      return { count };
  }


  /**
   * 创建 Article  实例
   *
   * @param articleDto 创建数据
   * @param user 操作用户
   *
   */
  @Post()
  @ApiOperation({
    summary: '创建文章',
  })
  async create(
    @Body() articleDto: CreateArticleDto,
    // @User() user: RequestUser,
  ): Promise<ArticleDto> {
    const instance = await this.articleService.create(articleDto);

    return instance;
  }

  /**
   * 删除 Article 实例
   *
   * @param articleId 文章id
   * @param user 操作用户
   */
  @Delete('/articles/:articleId(\\d+)')
  @ApiOperation({
    summary: '删除 文章数据',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'articleId', description: 'articleId', type: Number })
  async delete(
    @Param('articleId') articleId: number,
    // @User() user: RequestUser,
  ): Promise<ArticleDto> {
    const instance = await this.articleService.removeByPk(articleId);

    return instance;
  }

  /**
   * 更新 Article 实例
   *
   * @param articleId 文章id
   * @param user 操作用户
   */
  @Put('/articles/:articleId(\\d+)')
  @ApiOperation({
    summary: '更新 文章数据',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'articleId', description: 'articleId', type: Number })
  async updateByPk(
    @Param('articleId') articleId: number,
    @Body() updateDto: UpdateArticleDto,
    // @User() user: RequestUser,
  ): Promise<ArticleDto> {
    const instance = await this.articleService.updateByPk(articleId, updateDto);

    return instance;
  }
}
