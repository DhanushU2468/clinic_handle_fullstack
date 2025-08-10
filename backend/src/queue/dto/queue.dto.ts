import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { QueueStatus } from '../../entities/queue.entity';

export class CreateQueueDto {
  @IsNumber()
  patientId: number;

  @IsNumber()
  queueNumber: number;

  @IsEnum(QueueStatus)
  @IsOptional()
  status?: QueueStatus;

  @IsBoolean()
  @IsOptional()
  priority?: boolean;
}

export class UpdateQueueDto {
  @IsNumber()
  @IsOptional()
  patientId?: number;

  @IsNumber()
  @IsOptional()
  queueNumber?: number;

  @IsEnum(QueueStatus)
  @IsOptional()
  status?: QueueStatus;

  @IsBoolean()
  @IsOptional()
  priority?: boolean;
}
