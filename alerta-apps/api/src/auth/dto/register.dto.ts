import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString({ message: 'Nomor telepon harus berupa teks' })
  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}
