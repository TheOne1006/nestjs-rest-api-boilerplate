import { ApiProperty } from '@nestjs/swagger';
import { SystemConfigBase } from './system-config-base.dto';


export class CreateSystemConfigDto extends SystemConfigBase {
  @ApiProperty({
    example: {type: 'string'},
    description: '规则',
  })
  rules: any;
}