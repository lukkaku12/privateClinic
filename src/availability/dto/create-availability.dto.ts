// create-availability.dto.ts
import { IsNotEmpty, IsBoolean, IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @IsString()
  end_time: string;

  @IsBoolean()
  is_available: boolean;
}

