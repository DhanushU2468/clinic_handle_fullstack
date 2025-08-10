import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

export enum QueueStatus {
  SCHEDULED = 'scheduled',
  IN_QUEUE = 'in_queue',
  SERVED = 'served',
  CANCELLED = 'cancelled',
}

@Entity('queues')
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  queueNumber: string;

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.SCHEDULED })
  status: QueueStatus;

  @Column({ type: 'timestamp', nullable: true })
  estimatedWaitTime: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Doctor, doctor => doctor.queues)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.queues)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  doctorId: string;

  @Column()
  patientId: string;
}
