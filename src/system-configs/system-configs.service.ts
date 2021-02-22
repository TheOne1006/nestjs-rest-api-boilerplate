
import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SystemConfig } from './system-config.entity';
import { SystemConfigDto } from './dto/system-config.dto';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';


/**
 * Service system configuration
 *
 * 系统项配置服务
 *
 */
@Injectable()
export class SystemConfigsService {
  constructor(
    @InjectModel(SystemConfig)
    private readonly systemConfigModel: typeof SystemConfig,
  ) {}

  /**
   * 创建配置项
   * @param  {CreateSystemConfigDto} createSystemConfigDto
   * @returns Promise
   */
  async create(
    createSystemConfigDto: CreateSystemConfigDto,
  ): Promise<SystemConfigDto> {
    const data = new SystemConfig(createSystemConfigDto as SystemConfig);
    const instance = await data.save();

    return instance;
  }

  async findAll(): Promise<SystemConfig[]> {
    return this.systemConfigModel.findAll();
  }

  async findByPk(id: string): Promise<SystemConfig> {
    return this.systemConfigModel.findByPk(id);
  }

  async remove(id: string): Promise<SystemConfig> {
    const data = await this.findByPk(id);
    await data.destroy();
    return data;
  }

  async update(
    id: string,
    updateSystemConfigDto: UpdateSystemConfigDto,
  ): Promise<SystemConfig> {
    const data = await this.findByPk(id);

    let needsUpdate = false;
    _.map(updateSystemConfigDto, (value: any, key: string) => {
      const originalValue = data.get(key);
      if (value !== originalValue) {
        needsUpdate = true;
        data[key] = value;
      }
    });

    return needsUpdate ? data.save() : data;
  }
}
