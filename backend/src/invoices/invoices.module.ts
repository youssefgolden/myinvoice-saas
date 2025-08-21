import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { User } from 'src/users/user.entity';
import { Client } from 'src/clients/client.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User, Client])],
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [TypeOrmModule, InvoicesService],
})
export class InvoicesModule {}
