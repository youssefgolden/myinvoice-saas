import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessProfile } from './business-profile.entity';



@Module({
  imports: [TypeOrmModule.forFeature([BusinessProfile])],
  exports: [TypeOrmModule], // expose repository to other modules
})
export class BusinessProfilesModule {}
