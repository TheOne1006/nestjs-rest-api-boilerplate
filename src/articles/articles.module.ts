import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticlesController } from './articles.controller';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Article]),
  ],
  controllers: [ArticlesController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticlesModule {}
