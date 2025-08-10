import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  gender: string;

  @IsString()
  contactInfo: string;

  // Optional fields that can be generated or set to defaults
  @IsString()
  @IsOptional()
  medicalRecordNumber?: string;

  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  allergies?: string;

  @IsString()
  @IsOptional()
  medicalHistory?: string;
}

export class UpdatePatientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  contactInfo?: string;

  @IsString()
  @IsOptional()
  medicalRecordNumber?: string;

  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  allergies?: string;

  @IsString()
  @IsOptional()
  medicalHistory?: string;
}
