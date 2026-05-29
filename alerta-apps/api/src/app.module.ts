import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ArticlesModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
