import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from './invoice-item.entity';
import { Invoice } from 'src/invoices/invoice.entity';
import { InvoiceItemsService } from './invoice-items.service';
import { InvoiceCalcService } from 'src/invoices/invoice-calc.service';
import { InvoiceItemsController } from './invoice-items.controller';





@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItem, Invoice])],
  providers: [InvoiceItemsService, InvoiceCalcService],
  controllers: [InvoiceItemsController],
  exports: [TypeOrmModule, InvoiceItemsService],
})
export class InvoiceItemsModule {}
