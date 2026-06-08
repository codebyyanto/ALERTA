import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    const where = status ? { status } : {};
    return this.prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException(`Artikel dengan ID ${id} tidak ditemukan`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        summary: createArticleDto.summary,
        content: createArticleDto.content,
        category: createArticleDto.category,
        image: createArticleDto.image || undefined,
        status: createArticleDto.status || 'DRAFT',
      },
    });
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    // Pastikan artikel ada
    await this.findOne(id);

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async delete(id: string) {
    // Pastikan artikel ada
    await this.findOne(id);

    await this.prisma.article.delete({
      where: { id },
    });

    return { message: 'Artikel berhasil dihapus' };
  }
}
