import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsInt()
  patientId: number;

  @IsNotEmpty()
  @IsInt()
  doctorId: number;

  @IsNotEmpty()
  @IsInt()
  availability_id: number;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  notes?: string;
}