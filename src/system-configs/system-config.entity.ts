import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'system_configs',
  version: true,
})
export class SystemConfig extends Model<SystemConfig> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  key: string;

  @Column(DataType.STRING)
  scope: string;

  @Column(DataType.STRING)
  format: string;

  @Column(DataType.TEXT)
  desc: string;

  // 规则
  @Column(DataType.JSON)
  rules: string;

  @Column(DataType.STRING)
  example: string;

  @Column({ type: DataType.TEXT, field: 'text_value' })
  textValue: string;

  @Column({ type: DataType.INTEGER, field: 'int_value' })
  intValue: number;

  @Column({ type: DataType.JSON, field: 'json_value' })
  jsonValue: any;

  @Column({ type: DataType.JSON, field: 'array_value' })
  arrayValue: any;

  @Column({ type: DataType.INTEGER, field: 'float_value' })
  floatValue: number;

  @Column({ type: DataType.BOOLEAN, field: 'boolean_value' })
  booleanValue: boolean;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: Date;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: Date;

  @Column({ type: DataType.DATE, field: 'deleted_at' })
  deletedAt: Date;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  version: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, field: 'is_deleted' })
  isDeleted: boolean;
}
