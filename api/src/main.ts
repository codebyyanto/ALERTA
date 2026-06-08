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

      // Auto-seed Articles
      const articlesCount = await prisma.article.count();
      if (articlesCount === 0) {
        await prisma.article.createMany({
          data: [
            {
              title: 'Langkah Darurat Saat Banjir Bandang Datang',
              summary: 'Panduan praktis evakuasi mandiri untuk warga yang berada di area rawan bencana banjir.',
              content: 'Banjir bandang adalah salah satu bencana hidrometeorologi yang paling merusak. Berikut adalah langkah darurat yang harus Anda lakukan: \n1. Segera evakuasi ke tempat yang lebih tinggi.\n2. Matikan aliran listrik di rumah.\n3. Jangan berjalan atau berkendara menerobos arus air.\n4. Siapkan tas siaga bencana yang mudah dijangkau.',
              category: 'MITIGASI BANJIR',
              image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400',
              status: 'PUBLISHED',
            },
            {
              title: 'Memahami Segitiga Kehidupan (Triangle of Life)',
              summary: 'Analisis teknis mengenai struktur bangunan dan cara perlindungan diri yang paling aman saat gempa.',
              content: 'Segitiga Kehidupan adalah konsep perlindungan diri saat gempa bumi dengan cara berlindung di sebelah objek besar (seperti lemari besi atau sofa yang kokoh), bukan di bawah meja. Saat langit-langit runtuh, benda kokoh tersebut akan menahan berat reruntuhan dan menyisakan ruang kosong di sampingnya (segitiga kehidupan) tempat Anda bisa selamat.',
              category: 'PANDUAN GEMPA',
              image: 'https://images.unsplash.com/photo-1582213782179-a0c52e250e8a?auto=format&fit=crop&q=80&w=400',
              status: 'DRAFT',
            },
            {
              title: 'Protokol Pembersihan Lahan Tanpa Bakar',
              summary: 'Panduan edukasi bagi petani mengenai teknik PLTB untuk mencegah kebakaran hutan skala besar.',
              content: 'Membakar lahan adalah metode tradisional yang cepat namun sangat berisiko memicu kebakaran hutan hebat. Metode Pembukaan Lahan Tanpa Bakar (PLTB) meliputi: \n1. Pengolahan limbah kayu menjadi kompos atau mulsa.\n2. Penggunaan bio-dekomposer untuk mempercepat pembusukan sisa tanaman.\n3. Pemanfaatan sisa tebangan untuk pupuk organik.',
              category: 'KEBAKARAN HUTAN',
              image: 'https://images.unsplash.com/photo-1542350327-013b6b9e4307?auto=format&fit=crop&q=80&w=400',
              status: 'PUBLISHED',
            }
          ]
        });
        console.log('✅ AUTO-SEED: 3 Artikel Edukasi Awal Berhasil Dibuat!');
      } else {
        console.log('ℹ️ AUTO-SEED: Artikel Edukasi sudah terdaftar.');
      }
    } catch (error) {
      console.error('❌ Gagal melakukan auto-seed admin/articles:', error);
    }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
