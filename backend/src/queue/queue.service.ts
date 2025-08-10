import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from '../entities/queue.entity';
import { CreateQueueDto } from './dto/queue.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private queueRepository: Repository<Queue>,
  ) {}

  async findAll(): Promise<Queue[]> {
    return this.queueRepository.find({ relations: ['doctor', 'patient'] });
  }

  async findOne(id: string): Promise<Queue> {
    const queue = await this.queueRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });
    if (!queue) {
      throw new NotFoundException(`Queue with id ${id} not found`);
    }
    return queue;
  }

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const queue = this.queueRepository.create({
      ...createQueueDto,
      patientId: createQueueDto.patientId.toString(),
      queueNumber: createQueueDto.queueNumber.toString(),
    });
    return this.queueRepository.save(queue);
  }

  async update(id: string, updateQueueDto: Partial<CreateQueueDto>): Promise<Queue> {
    const queue = await this.findOne(id);
    Object.assign(queue, updateQueueDto);
    return this.queueRepository.save(queue);
  }

  async remove(id: string): Promise<void> {
    const queue = await this.findOne(id);
    await this.queueRepository.remove(queue);
  }
}
