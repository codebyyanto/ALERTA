import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  // Auto-seed if database is empty
  private async checkAndSeed() {
    const count = await this.prisma.report.count();
    if (count === 0) {
      await this.prisma.report.createMany({
        data: [
          {
            reporterName: 'Andi Darmawan',
            category: 'Kebakaran',
            location: 'Jakarta Selatan, Tebet',
            time: '10:45, Hari ini',
            status: 'MENUNGGU',
          },
          {
            reporterName: 'Siti Aminah',
            category: 'Banjir',
            location: 'Bandung, Baleendah',
            time: '08:20, Hari ini',
            status: 'TERVERIFIKASI',
          },
          {
            reporterName: 'Budi Kusuma',
            category: 'Gempa',
            location: 'Cianjur, Sukaluyu',
            time: 'Kemarin, 22:15',
            status: 'DITOLAK',
          },
        ],
      });
    }
  }

  async findAll(page: number = 1, status?: string, search?: string) {
    await this.checkAndSeed();

    const limit = 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { reporterName: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.report.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data,
      total,
      totalPages,
    };
  }

  async getRecent() {
    await this.checkAndSeed();

    const reports = await this.prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return reports.map((r, index) => {
      let tag = 'BEBERAPA SAAT LALU';
      if (index === 0) tag = 'BARU SAJA';
      else if (index === 1) tag = '15 MENIT LALU';
      else if (index === 2) tag = '1 JAM LALU';

      return {
        id: r.id,
        tag,
        title: `Laporan ${r.category}: ${r.location.split(',')[0]}`,
        content: `Warga melaporkan adanya kejadian ${r.category.toLowerCase()} di sekitar ${r.location}. Laporan saat ini berstatus ${r.status}.`,
        isNew: r.status === 'MENUNGGU',
      };
    });
  }

  async getStats() {
    await this.checkAndSeed();

    const total = await this.prisma.report.count();
    const waiting = await this.prisma.report.count({ where: { status: 'MENUNGGU' } });
    const verified = await this.prisma.report.count({ where: { status: 'TERVERIFIKASI' } });

    const verifiedRate = total > 0 ? `${Math.round((verified / total) * 100)}%` : '0%';

    return {
      total,
      totalTrend: '+12%',
      waiting,
      verified,
      verifiedRate,
      avgResponse: '14m',
      avgResponseTrend: '-2m',
    };
  }

  async updateStatus(id: string, status: 'TERVERIFIKASI' | 'DITOLAK') {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });
    if (!report) {
      throw new NotFoundException(`Laporan dengan ID ${id} tidak ditemukan`);
    }

    return this.prisma.report.update({
      where: { id },
      data: { status },
    });
  }
}
