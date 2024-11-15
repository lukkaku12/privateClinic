import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn()
  availabilityId: number;

  @ManyToOne(() => User, (user) => user.availabilities)
  doctor: User;

  @Column('date')
  date: string;

  @Column('time')
  start_time: string;

  @Column('time')
  end_time: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column('boolean', { default: true })
  is_available: boolean;
}