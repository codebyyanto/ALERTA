import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Put, 
  Query 
} from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    return this.reportsService.findAll(pageNum, status, search);
  }

  @Get('recent')
  getRecent() {
    return this.reportsService.getRecent();
  }

  @Get('stats')
  getStats() {
    return this.reportsService.getStats();
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'TERVERIFIKASI' | 'DITOLAK',
  ) {
    return this.reportsService.updateStatus(id, status);
  }
}
