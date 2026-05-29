import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for mobile app connectivity
  app.enableCors();

  // Global Validation Pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Auto-seed Admin User
  const prisma = app.get(PrismaService);
  const adminEmail = 'admin@alerta.go.id';
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Administrator Alerta',
          password: hashedPassword,
          role: 'ADMIN',
          phone: '081234567890',
        },
      });
      console.log('--------------------------------------------------');
      console.log('✅ AUTO-SEED: Akun Admin Alerta berhasil dibuat!');
      console.log(`   Email: ${adminEmail}`);
      console.log('   Password: admin123');
      console.log('--------------------------------------------------');
    } else {
      console.log('ℹ️ AUTO-SEED: Akun Admin Alerta sudah terdaftar.');
    }
  } catch (error) {
    console.error('❌ Gagal melakukan auto-seed admin:', error);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
