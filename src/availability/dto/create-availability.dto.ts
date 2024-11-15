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
  start_Time: string;

  @IsNotEmpty()
  @IsString()
  end_Time: string;

  @IsBoolean()
  is_available: boolean;
}

