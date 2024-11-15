import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Availability } from 'src/availability/entities/availability.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  completeName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({default: 'patient'})
  role: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointmentsAsPatient: Appointment[];

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointmentsAsDoctor: Appointment[];

  @OneToMany(() => Availability, (availability) => availability.doctor)
availabilities: Availability[];
}