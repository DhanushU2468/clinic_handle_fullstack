import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  specialization: string;

  @IsString()
  gender: string;

  @IsString()
  location: string;

  @IsObject()
  @IsOptional()
  availability?: any;
}

export class UpdateDoctorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  specialization?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsObject()
  @IsOptional()
  availability?: any;
}
