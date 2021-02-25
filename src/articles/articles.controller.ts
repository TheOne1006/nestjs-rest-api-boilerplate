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
} from './dtos'



@Controller('v1/articles')
@ApiTags('articles')
export class ArticlesController {

  /**
   * 创建 Article  实例
   *
   * @param articleDto 创建数据
   * @param user 操作用户
   *
   */
  @Post('/')
  @ApiOperation({
    summary: '创建文章',
  })
  @ApiParam({
    name: 'id',
    description: 'textbook主键',
    type: Number,
    required: true,
  })
  async create(
    @Body() materialDto: CreateArticleDto,
    // @User() user: RequestUser,
  ): Promise<ArticleDto> {
    const { sorting, unitId, type, sectionId, sameSectionGuid } = materialDto;

    if (!isValid) {
      const errText = await this.i18n.translate('MATERIAL_ERR.REMOTE_ID_INVALID');
      throw new BadRequestException(errText);
    }


    const remoteId = type === MATERIAL_TYPE.SAME ? sameSectionGuid: sectionId;

    const [unitInstance, remoteData] = await Promise.all([
      this.unitService.findByPkBelong(
        textbookIns.id,
        unitId,
      ),
      this.remoteService.getRemoteById(type, remoteId)
    ]);


    const instance = await this.materialService.createBelong(
      textbookIns,
      unitInstance,
      sorting,
      {
        ...materialDto,
        title: materialDto.title || remoteData?.title,
        videoDuration: remoteData?.play_time || 0,
      }
    );

    await this.textbookService.doModify(textbookIns.id, user.username);

    return instance;
  }
}
