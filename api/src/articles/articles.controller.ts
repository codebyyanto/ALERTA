import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Query 
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.articlesService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }
}
