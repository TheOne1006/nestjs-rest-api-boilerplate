import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * 文章 dtos
 */
export class ArticleDto {
  @ApiProperty({
    example: '',
    description: 'id',
  })
  id: number;

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

  @ApiProperty({
    example: '1',
    description: '所有者id',
  })
  @Exclude()
  owner: number;

  @ApiProperty({
    example: '',
    description: 'version',
  })
  @Exclude()
  version: number;
}
