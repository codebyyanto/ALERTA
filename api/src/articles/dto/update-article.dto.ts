import { IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString({ message: 'Judul harus berupa string' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Ringkasan harus berupa string' })
  @IsOptional()
  summary?: string;

  @IsString({ message: 'Konten harus berupa string' })
  @IsOptional()
  content?: string;

  @IsString({ message: 'Kategori harus berupa string' })
  @IsOptional()
  category?: string;

  @IsString({ message: 'URL Gambar harus berupa string' })
  @IsOptional()
  image?: string;

  @IsString({ message: 'Status harus berupa string' })
  @IsOptional()
  status?: string;
}
