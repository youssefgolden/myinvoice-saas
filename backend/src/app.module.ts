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

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        if (!url) throw new Error('DATABASE_URL is not set');

        // 1) Si DB_SSL est défini -> on l’utilise
        // 2) Sinon on déduit :
        //    - URL host contient ".internal" -> pas de SSL
        //    - sinon -> SSL ON (cas External URL Render)
        const explicit = config.get<string>('DB_SSL');
        const host = (() => {
          try { return new URL(url).hostname; } catch { return ''; }
        })();

        const inferredSsl = host.includes('.internal') ? false : true;
        const dbSsl = explicit != null
          ? explicit.toLowerCase() === 'true'
          : inferredSsl;

        // Options pg pour SSL (compat Render / cert manquant)
        const sslOption = dbSsl ? { rejectUnauthorized: false } : false;

        return {
          type: 'postgres',
          url,                  // ex External: ...render.com:5432/db?ssl=true
                                // ex Internal: ...internal:5432/db
          autoLoadEntities: true,
          synchronize: false,   // true seulement en dev ponctuel si tu sais ce que tu fais
          logging: true,        // passe à false quand tout est stable
          ssl: sslOption,
          ...(dbSsl ? { extra: { ssl: { rejectUnauthorized: false } } } : {}),
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
