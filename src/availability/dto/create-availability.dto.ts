// create-availability.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateAvailabilityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start_Time: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  end_Time: string;

  @ApiProperty()
  @IsBoolean()
  is_available: boolean;
}

