import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  exports: [TypeOrmModule], // expose repository to other modules
})
export class ClientsModule {}
