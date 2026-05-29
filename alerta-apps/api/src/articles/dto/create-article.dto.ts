import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: 'Judul harus berupa string' })
  @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
  title: string;

  @IsString({ message: 'Ringkasan harus berupa string' })
  @IsNotEmpty({ message: 'Ringkasan tidak boleh kosong' })
  summary: string;

  @IsString({ message: 'Konten harus berupa string' })
  @IsNotEmpty({ message: 'Konten tidak boleh kosong' })
  content: string;

  @IsString({ message: 'Kategori harus berupa string' })
  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  category: string;

  @IsString({ message: 'URL Gambar harus berupa string' })
  @IsOptional()
  image?: string;

  @IsString({ message: 'Status harus berupa string' })
  @IsOptional()
  status?: string;
}
