import { Availability } from 'src/availability/entities/availability.entity';
import { User } from 'src/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
 
  
  @Entity('appointment')
  export class Appointment {
    @PrimaryGeneratedColumn()
    appointmentId: number;
  
    @ManyToOne(() => User, user => user.appointmentsAsPatient)
    @JoinColumn({ name: 'patient_id' })
    patient: User;
  
    @ManyToOne(() => User, user => user.appointmentsAsDoctor)
    @JoinColumn({ name: 'doctor_id' })
    doctor: User;
  
    @OneToOne(() => Availability)
    @JoinColumn({ name: 'availability_id' })
    availability: Availability;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column('text')
    reason: string;
  
    @Column('text', { nullable: true })
    notes: string;
  }