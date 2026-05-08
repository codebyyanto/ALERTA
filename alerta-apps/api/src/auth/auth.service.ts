import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    const { name, email, phone, password } = registerDto;

    // Cek apakah email sudah digunakan
    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    // Cek apakah nomor telepon sudah digunakan
    const existingPhone = await this.usersService.findByPhone(phone);
    if (existingPhone) {
      throw new BadRequestException('Nomor telepon sudah terdaftar');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const user = await this.usersService.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Auto-login setelah register
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'Pendaftaran berhasil',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Cari user berdasarkan email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Jika user tidak punya password
    if (!user.password) {
      throw new UnauthorizedException('Gunakan login dengan Google untuk akun ini');
    }

    // Cocokkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Generate JWT Token
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };
  }

  async adminLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Cari user berdasarkan email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Pastikan user ini adalah admin
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Akses ditolak. Anda bukan admin.');
    }

    // Jika user tidak punya password
    if (!user.password) {
      throw new UnauthorizedException('Gunakan login dengan Google untuk akun ini');
    }

    // Cocokkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Generate JWT Token
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };
  }

  async googleLoginPlaceholder() {
    return {
      message: 'Google login endpoint is under construction.',
    };
  }
}
