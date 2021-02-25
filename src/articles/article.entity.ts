import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'articles',
  version: true,
})
export class Article extends Model<Article> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @Column(DataType.STRING)
  brief: string;

  @Column(DataType.STRING)
  classification: string;

  @Column(DataType.INTEGER)
  owner: string;

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
