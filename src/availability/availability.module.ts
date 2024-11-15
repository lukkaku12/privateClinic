import { Module } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AvailabilityController } from './availability.controller';
import { Availability } from './entities/availability.entity';
import { AvailabilityService } from './availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([Availability, User])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, JwtService],
})
export class AvailabilityModule {}
