import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { BusinessProfilesModule } from './business-profile/business-profiles.module';
import { InvoicesModule } from './invoices/invoices.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        const isRender = url?.includes('render.com') || url?.includes('sslmode=require');
        return {
          type: 'postgres',
          url,
          autoLoadEntities: true,
          synchronize: false,      
          logging: true,
          ssl: isRender
            ? { rejectUnauthorized: false } 
            : undefined,
        };
      },
    }),
    UsersModule,
    ClientsModule,
    BusinessProfilesModule,
    InvoicesModule,
  ],
})
export class AppModule {}
