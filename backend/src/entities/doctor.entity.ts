import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Queue } from './queue.entity';
import { User } from './user.entity';

export enum DoctorSpecialty {
  CARDIOLOGY = 'cardiology',
  NEUROLOGY = 'neurology',
  PEDIATRICS = 'pediatrics',
  ORTHOPEDICS = 'orthopedics',
  DERMATOLOGY = 'dermatology',
  GENERAL_MEDICINE = 'general_medicine',
  SURGERY = 'surgery',
  PSYCHIATRY = 'psychiatry',
}

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  licenseNumber: string;

  @Column({
    type: 'enum',
    enum: DoctorSpecialty,
  })
  specialty: DoctorSpecialty;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  consultationFee: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'time', nullable: true })
  availableFrom: string;

  @Column({ type: 'time', nullable: true })
  availableTo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.doctors)
  user: User;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @OneToMany(() => Queue, queue => queue.doctor)
  queues: Queue[];

  get fullName(): string {
    return this.user ? this.user.fullName : '';
  }
}
