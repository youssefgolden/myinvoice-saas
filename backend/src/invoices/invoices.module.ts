import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  exports: [TypeOrmModule], // expose repository to other modules
})
export class InvoicesModule {}
