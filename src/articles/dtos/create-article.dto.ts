import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';


/**
 * 创建文章的 dto
 */
export class CreateArticleDto implements Pick<ArticleDto, 'title' | 'content' | 'brief' | 'classification'> {
  @ApiProperty({
    example: '人工智能的发展史',
    description: '标题',
  })
  title: string;

  @ApiProperty({
    example: '内容。。。。。。。',
    description: '文章内容',
  })
  content: string;

  @ApiProperty({
    example: '人工智能简述',
    description: '简述',
  })
  brief: string;


  @ApiProperty({
    example: 'computer',
    description: '文章类别',
  })
  classification: string;
}

