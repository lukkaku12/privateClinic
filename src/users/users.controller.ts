import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    description:
      'data needed to create a new user, wether he is a doctor or a patient (by default it will create patients)',
    schema: {
      example: {
        completeName: 'pepito aguascalientes',
        email: 'perrito1223@gmail.com',
        password: 'whicheverRight',
        role: 'patient',
      },
    },
  })
  create(@Body() createUsuarioDto: CreateUserDto) {
    return this.usersService.create(createUsuarioDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
