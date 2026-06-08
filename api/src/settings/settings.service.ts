import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private prisma: PrismaService) { }

  // Auto-seed settings on module initialization
  async onModuleInit() {
    await this.ensureSettingsExist();
  }

  async getSettings() {
    return this.ensureSettingsExist();
  }

  async updateSettings(data: any) {
    const settings = await this.ensureSettingsExist();

    // Whitelist and format the incoming update data
    const updateData: any = {};

    if (data.appName !== undefined) updateData.appName = data.appName;
    if (data.hotline !== undefined) updateData.hotline = data.hotline;
    if (data.institution !== undefined) updateData.institution = data.institution;
    if (data.emailSupport !== undefined) updateData.emailSupport = data.emailSupport;
    if (data.maintenanceMode !== undefined) updateData.maintenanceMode = Boolean(data.maintenanceMode);
    if (data.allowRegistration !== undefined) updateData.allowRegistration = Boolean(data.allowRegistration);
    if (data.googleAuthEnabled !== undefined) updateData.googleAuthEnabled = Boolean(data.googleAuthEnabled);
    if (data.maxAlertRadius !== undefined) updateData.maxAlertRadius = Number(data.maxAlertRadius);
    if (data.alertNotification !== undefined) updateData.alertNotification = data.alertNotification;
    if (data.notificationSound !== undefined) updateData.notificationSound = data.notificationSound;

    return this.prisma.systemSetting.update({
      where: { id: settings.id },
      data: updateData,
    });
  }

  // Ensures at least one settings row exists, creating it if it doesn't
  private async ensureSettingsExist() {
    let settings = await this.prisma.systemSetting.findFirst();
    if (!settings) {
      settings = await this.prisma.systemSetting.create({
        data: {
          appName: 'ALERTA',
          hotline: '112',
          institution: 'Badan Penanggulangan Bencana Daerah',
          emailSupport: 'support@alerta.go.id',
          maintenanceMode: false,
          allowRegistration: true,
          googleAuthEnabled: true,
          maxAlertRadius: 15,
          alertNotification: 'ALL',
          notificationSound: 'emergency_siren',
        },
      });
      console.log('AUTO-SEED: Pengaturan sistem default berhasil dibuat!');
    }
    return settings;
  }
}
