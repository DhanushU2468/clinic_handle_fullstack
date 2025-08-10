import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Queue } from './queue.entity';
import { User } from './user.entity';

export enum PatientGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  medicalRecordNumber: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: PatientGender,
    nullable: true,
  })
  gender: PatientGender;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ type: 'text', nullable: true })
  allergies: string;

  @Column({ type: 'text', nullable: true })
  medicalHistory: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.patients)
  user: User;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Queue, queue => queue.patient)
  queues: Queue[];

  // Additional fields to support frontend data structure
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactInfo: string;

  get age(): number {
    if (!this.dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  set age(value: number) {
    // Calculate dateOfBirth based on age
    const today = new Date();
    const birthYear = today.getFullYear() - value;
    this.dateOfBirth = new Date(birthYear, today.getMonth(), today.getDate());
  }

  get fullName(): string {
    return this.name || '';
  }
}
