import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({ relations: ['doctor', 'patient'] });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with id ${id} not found`);
    }
    return appointment;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      appointmentDate: createAppointmentDto.appointmentDate instanceof Date 
        ? createAppointmentDto.appointmentDate 
        : new Date(createAppointmentDto.appointmentDate),
    });
    return this.appointmentsRepository.save(appointment);
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    if (updateAppointmentDto.appointmentDate) {
      updateAppointmentDto.appointmentDate = updateAppointmentDto.appointmentDate instanceof Date 
        ? updateAppointmentDto.appointmentDate 
        : new Date(updateAppointmentDto.appointmentDate);
    }
    
    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentsRepository.remove(appointment);
  }
}
