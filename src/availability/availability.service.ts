import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Availability } from './entities/availability.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const { doctorId, date, start_Time, end_Time, is_available } = createAvailabilityDto;

   
    const doctor = await this.userRepository.findOne({where: {userId: doctorId}});
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found.`);
    }

    
    const appointmentDate = new Date(`${date}T00:00:00Z`);
    const today = new Date();
    if (appointmentDate < today) {
      throw new BadRequestException('the Date should be prior to the actual one.');
    }

    
    const startTime = new Date(`1970-01-01T${start_Time}:00Z`).getTime();
    const endTime = new Date(`1970-01-01T${end_Time}:00Z`).getTime();

    if (startTime >= endTime) {
      throw new BadRequestException('La hora de inicio debe ser anterior a la hora de finalización.');
    }

    const existingAvailability = await this.availabilityRepository.findOne({where: {
      doctor,  // Comparación por el doctor
      start_time: MoreThanOrEqual(start_Time),  // Comparar si el start_time en la DB es mayor o igual a startTime
      end_time: LessThanOrEqual(end_Time),
    }})

    if (existingAvailability) {
      throw new BadRequestException('El doctor ya tiene una cita en esa fecha y horario.');
    }

    const availability = this.availabilityRepository.create({
      doctor,
      date,
      start_time: start_Time,
      end_time: end_Time,
      is_available,
    });

    return await this.availabilityRepository.save(availability);
  }

  
  async findAll(): Promise<Availability[]> {
    return await this.availabilityRepository.find();
  }

  
  async findOne(id: number): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({where:{availabilityId: id}});
    if (!availability) {
      throw new NotFoundException(`Disponibilidad con ID ${id} no encontrada.`);
    }
    return availability;
  }

  
  async update(id: number, updateAvailabilityDto: UpdateAvailabilityDto): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({where:{availabilityId: id}});
    if (!availability) {
      throw new NotFoundException(`Disponibilidad con ID ${id} no encontrada.`);
    }
    
    
    const updatedAvailability = Object.assign(availability, updateAvailabilityDto);
    return await this.availabilityRepository.save(updatedAvailability);
  }

  
  async remove(id: number): Promise<void> {
    const availability = await this.availabilityRepository.findOne({where:{availabilityId: id}});
    if (!availability) {
      throw new NotFoundException(`Disponibilidad con ID ${id} no encontrada.`);
    }
    
    await this.availabilityRepository.remove(availability);
  }
}