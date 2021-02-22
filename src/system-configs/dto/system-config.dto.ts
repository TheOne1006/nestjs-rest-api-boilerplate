import { ApiProperty } from '@nestjs/swagger';
import { SystemConfigBase } from './system-config-base.dto';
import { IsOptional } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

/**
 * @extends {SystemConfigBase}
 */
export class SystemConfigDto extends SystemConfigBase {
  @ApiProperty({
    example: '',
    description: 'id',
  })
  id: number;

  @ApiProperty({
    example: '',
    description: 'version',
  })
  @Exclude()
  version: number;

  @IsOptional()
  @Type(() => Boolean)
  booleanValue?: boolean;
}
