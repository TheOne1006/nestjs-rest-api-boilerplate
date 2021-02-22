import * as Ajv from 'ajv';
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import {
  // ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
} from '@nestjs/swagger';

import { SystemConfigsService } from './system-configs.service';

import {
  SystemConfigDto,
  CreateSystemConfigDto,
  UpdateSystemConfigDto,
} from './dto';

/**
 * Controller system
 *
 * 系统配置
 */
@ApiSecurity('api_key')
@ApiTags('system-configs')
@Controller(`v1/system-configs`)
export class SystemConfigsController {
  constructor(private readonly systemConfigsService: SystemConfigsService) {}

  /**
   * 校验值属性
   * @param value
   * @param rules
   */
  validateValue(value: any, rules: any) {
    const ajv = new Ajv();

    const isValid = ajv.validate(rules, value);

    if (!isValid) {
      throw new Error(ajv.errorsText(ajv.errors));
    }
  }

  @Post()
  @ApiOperation({
    summary: '创建系统配置',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createSystemConfigDto: CreateSystemConfigDto,
  ): Promise<SystemConfigDto> {
    const matchKey = `${createSystemConfigDto.format}Value`;
    this.validateValue(
      createSystemConfigDto[matchKey],
      createSystemConfigDto.rules,
    );

    const instance = await this.systemConfigsService.create(
      createSystemConfigDto,
    );

    return instance;
  }

  @Get()
  @ApiOperation({ summary: '配置列表' })
  async findAll(): Promise<SystemConfigDto[]> {
    const list = await this.systemConfigsService.findAll();
    return list;
  }

  @Get(':id')
  @ApiOperation({ summary: '详情' })
  async findById(@Param('id') id: string): Promise<SystemConfigDto> {
    const instance = await this.systemConfigsService.findByPk(id);

    return instance;
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除配置项' })
  async deleteById(@Param('id') id: string): Promise<SystemConfigDto> {
    const instance = await this.systemConfigsService.remove(id);
    return instance;
  }

  @Put(':id')
  @ApiOperation({ summary: '修改配置项' })
  async updateById(
    @Param('id') id: string,
    @Body() updateSystemConfigDto: UpdateSystemConfigDto,
  ): Promise<SystemConfigDto> {
    const instance = await this.systemConfigsService.findByPk(id);

    const matchKey = `${instance.format}Value`;

    const value = updateSystemConfigDto[matchKey] || instance[matchKey];
    const rules = updateSystemConfigDto.rules || instance.rules;

    this.validateValue(value, rules);

    const instanceWithUpdate = await this.systemConfigsService.update(
      id,
      updateSystemConfigDto,
    );
    return instanceWithUpdate;
  }
}
