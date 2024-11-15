import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Availability } from 'src/availability/entities/availability.entity';
import { User } from 'src/users/entities/user.entity';
import { FilterAppointmentsDto } from './dto/filter-appointements.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { patientId, doctorId, reason, notes, availability_id } =
      createAppointmentDto;

    const patient = await this.userRepository.findOne({
      where: { userId: patientId },
    });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${patientId} no encontrado.`,
      );
    }

    const doctor = await this.userRepository.findOne({
      where: { userId: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${doctorId} no encontrado.`);
    }
    console.log(availability_id)

    const availability = await this.availabilityRepository.findOne({
      where: { availabilityId: availability_id },
    });
    if (!availability) {
      throw new NotFoundException(
        `Disponibilidad con ID ${availability_id} no encontrada.`,
      );
    }
    if (!availability.is_available) {
      throw new BadRequestException(
        `La disponibilidad con ID ${availability_id} no está disponible.`,
      );
    }

    if (!reason || reason.trim().length < 5) {
      throw new BadRequestException(
        'La razón de la cita debe ser válida y tener al menos 5 caracteres.',
      );
    }

    const appointment = this.appointmentRepository.create({
      patient,
      doctor,
      availability,
      reason,
      notes,
    });

    availability.is_available = false;
    await this.availabilityRepository.save(availability);

    return await this.appointmentRepository.save(appointment);
  }

  async findAll(filters: FilterAppointmentsDto): Promise<Appointment[]> {
    const { date, reason, doctor } = filters;

    const query = this.appointmentRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.patient', 'patient');

    if (date) {
      const startOfDay = new Date(date);
      
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);


      query.andWhere('appointment.created_at BETWEEN :startOfDay AND :endOfDay', {
        startOfDay: startOfDay.toISOString(),
      endOfDay: endOfDay.toISOString(), 
      });
    }

    if (reason) {
      query.andWhere('appointment.reason LIKE :reason', { reason: `%${reason}%` });
    }

    if (doctor) {
      query.andWhere('appointment.doctor = :doctor', { doctor });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointmentId: id },
      relations: ['patient', 'doctor', 'availability'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    this.appointmentRepository.merge(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }
}
