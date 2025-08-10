import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from '../entities/queue.entity';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  providers: [QueueService],
  controllers: [QueueController],
})
export class QueueModule {}
