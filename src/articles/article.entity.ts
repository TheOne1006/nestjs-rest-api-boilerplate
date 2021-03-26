import { Column,
  // Model,
  Table, DataType } from 'sequelize-typescript';
import { Model } from '../common/extends/base.model';


@Table({
  tableName: 'articles',
  version: true,
})
export class Article extends Model<Article> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @Column(DataType.STRING)
  brief: string;

  @Column(DataType.STRING)
  classification: string;

  @Column(DataType.INTEGER)
  owner: number;
}
