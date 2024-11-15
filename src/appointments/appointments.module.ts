import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

import { JwtService } from '@nestjs/jwt';
import { Availability } from 'src/availability/entities/availability.entity';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Availability])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, JwtService],
})
export class AppointmentsModule {}
