import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User dengan ID ${id} tidak ditemukan`);
    }
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(role?: string) {
    const where = role ? { role } : {};
    return this.prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createManual(data: any) {
    const { name, email, phone, password, role } = data;

    // Cek apakah email sudah digunakan
    const existingEmail = await this.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    // Cek apakah nomor telepon sudah digunakan
    if (phone) {
      const existingPhone = await this.findByPhone(phone);
      if (existingPhone) {
        throw new BadRequestException('Nomor telepon sudah terdaftar');
      }
    }

    // Hash password jika disediakan
    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: role || 'USER',
      },
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });
  }

  async update(id: string, data: any) {
    // Pastikan user ada
    await this.findById(id);

    const { name, email, phone, role, password } = data;

    // Validasi email unik jika email diubah
    if (email) {
      const existingEmail = await this.findByEmail(email);
      if (existingEmail && existingEmail.id !== id) {
        throw new BadRequestException('Email sudah digunakan oleh user lain');
      }
    }

    // Validasi telepon unik jika telepon diubah
    if (phone) {
      const existingPhone = await this.findByPhone(phone);
      if (existingPhone && existingPhone.id !== id) {
        throw new BadRequestException('Nomor telepon sudah digunakan oleh user lain');
      }
    }

    const updateData: any = {
      name,
      email,
      phone,
      role,
    };

    // Hash password baru jika diubah
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        phone: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });
  }

  async delete(id: string) {
    // Pastikan user ada
    await this.findById(id);

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Pengguna berhasil dihapus' };
  }
}

