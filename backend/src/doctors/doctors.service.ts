import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from './dto/doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }
    return doctor;
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorsRepository.create();
    Object.assign(doctor, {
      licenseNumber: '', // default or generate as needed
      specialty: createDoctorDto.specialization as any,
      bio: '',
      consultationFee: 0,
      isActive: true,
      availableFrom: null,
      availableTo: null,
      user: null,
      ...createDoctorDto,
    });
    return this.doctorsRepository.save(doctor);
  }

  async update(id: string, updateDoctorDto: Partial<CreateDoctorDto>): Promise<Doctor> {
    const doctor = await this.findOne(id);
    Object.assign(doctor, updateDoctorDto);
    return this.doctorsRepository.save(doctor);
  }

  async remove(id: string): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorsRepository.remove(doctor);
  }
}
