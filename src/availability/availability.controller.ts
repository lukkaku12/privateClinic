import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { ApiBearerAuth, ApiBody, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { DoctorRoleGuard } from 'src/auth/guards/doctor-role.guard';

@ApiTags('availability')
@UseGuards(JwtAuthGuard)
@UseGuards(DoctorRoleGuard)
@ApiBearerAuth() 
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new availability for a doctor' })
  @ApiBody({
    description: 'Data required to create a free schedule for the doctor',
    schema: {
      example: {
        doctorId: 2,
        date: "2024-11-20",
        start_time: "09:00",
        end_time: "12:00",
        is_available: true,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Availability created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or constraints violated' })
  create(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    return this.availabilityService.create(createAvailabilityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all availabilities' })
  @ApiResponse({
    status: 200,
    description: 'List of all availabilities',
    schema: {
      example: [
        {
          availabilityId: 1,
          doctorId: 2,
          date: "2024-11-20",
          start_time: "09:00",
          end_time: "12:00",
          is_available: true,
          created_at: "2024-11-15T10:00:00.000Z",
        },
      ],
    },
  })
  findAll() {
    return this.availabilityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific availability by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the availability to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'The requested availability',
    schema: {
      example: {
        availabilityId: 1,
        doctorId: 2,
        date: "2024-11-20",
        start_time: "09:00",
        end_time: "12:00",
        is_available: true,
        created_at: "2024-11-15T10:00:00.000Z",
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Availability not found' })
  findOne(@Param('id') id: string) {
    return this.availabilityService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing availability by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the availability to update',
  })
  @ApiBody({
    description: 'Updated data for the availability',
    schema: {
      example: {
        date: "2024-11-21",
        start_time: "10:00",
        end_time: "13:00",
        is_available: false,
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Availability updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or constraints violated' })
  @ApiResponse({ status: 404, description: 'Availability not found' })
  update(@Param('id') id: string, @Body() updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.availabilityService.update(+id, updateAvailabilityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an availability by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the availability to delete',
  })
  @ApiResponse({ status: 200, description: 'Availability deleted successfully' })
  @ApiResponse({ status: 404, description: 'Availability not found' })
  remove(@Param('id') id: string) {
    return this.availabilityService.remove(+id);
  }
}