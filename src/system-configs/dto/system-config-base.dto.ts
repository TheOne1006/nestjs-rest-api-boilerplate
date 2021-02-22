import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEnum, IsOptional } from 'class-validator';

export class SystemConfigBase {
  @IsOptional()
  textValue?: string;

  @IsOptional()
  jsonValue?: any;

  @IsOptional()
  rules?: any;

  @IsOptional()
  intValue?: number;

  @IsOptional()
  arrayValue?: any[];

  @IsOptional()
  booleanValue?: boolean;

  @IsOptional()
  floatValue?: number;

  @ApiProperty({
    example: 'enable samething',
    description: 'key',
  })
  @Length(5, 20)
  @IsString({
    message: '正确填写key值'
  })
  key: string;

  @ApiProperty({
    example: 'common',
    description: '范围作用域 通用 前端 后端 ',
    enum: ['common', 'frontEnd', 'backEnd'],
  })
  @IsEnum(['common', 'frontEnd', 'backEnd'])
  scope: string;

  @ApiProperty({
    example: 'text',
    description: '格式化方法',
    enum: ['text', 'float', 'int', 'json', 'array', 'boolean'],
  })
  @IsEnum(['text', 'float', 'int', 'json', 'array', 'boolean'])
  format: string;

  // @ApiProperty({
  //   example: 'true',
  //   description: '值',
  // })
  // value: any;

  @ApiProperty({
    example: '描述',
  })
  desc: string;
}
