import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { FilterAppointmentsDto } from './dto/filter-appointements.dto';
import { Appointment } from './entities/appointment.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { PatientRoleGuard } from 'src/auth/guards/patient-role.guard';

@ApiTags('appointments')
@UseGuards(JwtAuthGuard)
@UseGuards(PatientRoleGuard)
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiBody({
    description: 'Data needed to create an appointment',
    schema: {
      example: {
        doctorId: 1,
        patient_id: 2,
        availability_id: 1,
        reason: 'just because the patient wants to bruh',
        is_available: true,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The appointment has been successfully created',
    schema: {
      example: {
        appointmentId: 5,
        doctorId: 1,
        patient_id: 2,
        availability_id: 1,
        reason: 'just because the patient wants to bruh',
        created_at: '2024-11-15T10:00:00Z',
        updated_at: '2024-11-15T10:00:00Z',
        notes: null,
      },
    },
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all appointments with optional filters' })
  @ApiQuery({
    name: 'doctorId',
    required: false,
    type: Number,
    description: 'Filter by doctor ID',
  })
  @ApiQuery({
    name: 'patientId',
    required: false,
    type: Number,
    description: 'Filter by patient ID',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all appointments matching the filters',
    schema: {
      example: [
        {
          appointmentId: 5,
          doctorId: 1,
          patient_id: 2,
          availability_id: 1,
          reason: 'Regular check-up',
          created_at: '2024-11-15T10:00:00Z',
          updated_at: '2024-11-15T10:00:00Z',
          notes: null,
        },
      ],
    },
  })
  async findAll(
    @Query() filters: FilterAppointmentsDto,
  ): Promise<Appointment[]> {
    return this.appointmentsService.findAll(filters);
  }

  @Get('/client/:id')
  @ApiOperation({ summary: 'Get appointments for a specific patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'Appointments belonging to the given patient ID',
    schema: {
      example: [
        {
          appointmentId: 5,
          doctorId: 1,
          patient_id: 2,
          availability_id: 1,
          reason: 'Regular check-up',
          created_at: '2024-11-15T10:00:00Z',
          updated_at: '2024-11-15T10:00:00Z',
          notes: 'Bring medical history',
        },
      ],
    },
  })
  findClientAppointments(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an appointment by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The requested appointment',
    schema: {
      example: {
        appointmentId: 5,
        doctorId: 1,
        patient_id: 2,
        availability_id: 1,
        reason: 'Follow-up consultation',
        created_at: '2024-11-15T10:00:00Z',
        updated_at: '2024-11-15T10:00:00Z',
        notes: null,
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment by its ID' })
  @ApiBody({
    description: 'Updated data for the appointment',
    schema: {
      example: {
        reason: 'Updated reason for the appointment',
        notes: 'Bring updated documents',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully updated',
    schema: {
      example: {
        appointmentId: 5,
        doctorId: 1,
        patient_id: 2,
        availability_id: 1,
        reason: 'Updated reason for the appointment',
        created_at: '2024-11-15T10:00:00Z',
        updated_at: '2024-11-15T12:00:00Z',
        notes: 'Bring updated documents',
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The appointment has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'The appointment with the given ID was not found',
  })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}