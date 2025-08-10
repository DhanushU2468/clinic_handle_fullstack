import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AppointmentStatus } from '../../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  doctorId: string;

  appointmentDate: Date;

  @IsString()
  appointmentTime: string;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}

export class UpdateAppointmentDto {
  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsUUID()
  @IsOptional()
  doctorId?: string;

  appointmentDate?: Date;

  @IsString()
  @IsOptional()
  appointmentTime?: string;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
