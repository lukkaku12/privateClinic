import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user (doctor or patient)' })
  @ApiBody({
    description:
      'Data required to create a new user. By default, it will create a patient.',
    schema: {
      example: {
        completeName: 'John Doe',
        email: 'johndoe@gmail.com',
        password: 'securePassword123',
        role: 'patient', // Accepts 'patient' or 'doctor'
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or constraints violated' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    schema: {
      example: [
        {
          userId: 1,
          completeName: 'John Doe',
          email: 'johndoe@gmail.com',
          role: 'doctor',
          appointmentsAsPatient: [],
          appointmentsAsDoctor: [],
        },
        {
          userId: 2,
          completeName: 'Jane Smith',
          email: 'janesmith@gmail.com',
          role: 'patient',
          appointmentsAsPatient: [
            {
              appointmentId: 5,
              reason: 'General Checkup',
            },
          ],
        },
      ],
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
      example: {
        userId: 1,
        completeName: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'doctor',
        appointmentsAsPatient: [],
        appointmentsAsDoctor: [],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to update',
  })
  @ApiBody({
    description: 'Fields to update in the user',
    schema: {
      example: {
        completeName: 'Johnathan Doe',
        email: 'johnathan.doe@gmail.com',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        userId: 1,
        completeName: 'Johnathan Doe',
        email: 'johnathan.doe@gmail.com',
        role: 'doctor',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data or constraints violated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to delete',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}