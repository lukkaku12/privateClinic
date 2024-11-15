import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

export class FilterAppointmentsDto {
  @IsOptional()
  @IsDateString() // Para filtrar por fecha
  date?: string;

  @IsOptional()
  @IsString() // Para filtrar por motivo de la cita
  reason?: string;

  @IsOptional()
  @IsInt() // Para filtrar por especialidad, usando el doctorId o especialidad directamente
  doctor?: number;
}