import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { BusinessProfilesModule } from './business-profile/business-profiles.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceItemsModule } from './invoice-items/invoice-items.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     const url = config.get<string>('DATABASE_URL');
    //     const isRender = url?.includes('render.com') || url?.includes('sslmode=require');
    //     return {
    //       type: 'postgres',
    //       url,
    //       autoLoadEntities: true,
    //       synchronize: false,      
    //       logging: true,
    //       ssl: isRender
    //         ? { rejectUnauthorized: false } 
    //         : undefined,
    //     };
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        const dbSslFlag = (config.get<string>('DB_SSL') || 'false').toLowerCase() === 'true';
    
        // Sanity checks utiles en prod:
        if (!url) {
          throw new Error('DATABASE_URL is not set');
        }
    
        // SSL options pour Render External URL (ou tout endpoint qui exige TLS)
        const sslOn = dbSslFlag ? { rejectUnauthorized: false } as const : false;
    
        return {
          type: 'postgres',
          url,                       // ex: postgres://...render.com:5432/trezly_db?ssl=true
          autoLoadEntities: true,
          synchronize: false,        // garde false en prod
          logging: true,             // tu peux passer à false après debug
          ssl: sslOn,                // <- clé pour pg
          // certain clients pg exigent aussi "extra.ssl"
          ...(dbSslFlag ? { extra: { ssl: { rejectUnauthorized: false } } } : {}),
        };
      },
    }),
    
    UsersModule,
    ClientsModule,
    BusinessProfilesModule,
    InvoicesModule,
    InvoiceItemsModule,
    AuthModule,
  ],
})
export class AppModule {}
