import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Availability } from 'src/availability/entities/availability.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Availability])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, JwtService],
})
export class AppointmentsModule {}
