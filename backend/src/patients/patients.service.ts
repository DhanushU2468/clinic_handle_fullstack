import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from './dto/patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create();
    
    // Calculate dateOfBirth from age
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - createPatientDto.age, today.getMonth(), today.getDate());
    
    // Generate medical record number if not provided
    const medicalRecordNumber = createPatientDto.medicalRecordNumber || `MRN-${Date.now()}`;
    
    // Map frontend data to entity fields
    Object.assign(patient, {
      name: createPatientDto.name,
      contactInfo: createPatientDto.contactInfo,
      age: createPatientDto.age,
      gender: createPatientDto.gender.toLowerCase() as any, // Convert to enum
      medicalRecordNumber,
      dateOfBirth: birthDate,
      address: createPatientDto.address || '',
      emergencyContact: createPatientDto.emergencyContact || '',
      allergies: createPatientDto.allergies || '',
      medicalHistory: createPatientDto.medicalHistory || '',
      isActive: true,
      user: null,
    });
    
    return this.patientsRepository.save(patient);
  }

  async update(id: string, updatePatientDto: Partial<CreatePatientDto>): Promise<Patient> {
    const patient = await this.findOne(id);
    
    // Handle age to dateOfBirth conversion if age is provided
    if (updatePatientDto.age !== undefined) {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - updatePatientDto.age, today.getMonth(), today.getDate());
      patient.dateOfBirth = birthDate;
    }
    
    Object.assign(patient, updatePatientDto);
    return this.patientsRepository.save(patient);
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);
    await this.patientsRepository.remove(patient);
  }
}
