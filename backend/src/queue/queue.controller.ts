import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Queue } from '../entities/queue.entity';
import { CreateQueueDto, UpdateQueueDto } from './dto/queue.dto';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async findAll(): Promise<Queue[]> {
    return this.queueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Queue> {
    return this.queueService.findOne(id);
  }

  @Post()
  async create(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
    return this.queueService.create(createQueueDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateQueueDto: UpdateQueueDto,
  ): Promise<Queue> {
    return this.queueService.update(id, updateQueueDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.queueService.remove(id);
  }
}
