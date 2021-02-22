import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateSystemConfigDto {
  @ApiProperty({
    example: { type: 'string' },
    description: '规则',
  })
  rules?: any;

  @ApiProperty({
    example: 'common',
    description: '范围作用域 通用 前端 后端 ',
    enum: ['common', 'frontEnd', 'backEnd'],
  })
  @IsOptional()
  @IsEnum(['common', 'frontEnd', 'backEnd'])
  scope?: string;

  @ApiProperty({
    example: 'true',
    description: '值',
  })
  value?: any;

  @ApiProperty({
    example: '描述',
  })
  desc?: string;
}
