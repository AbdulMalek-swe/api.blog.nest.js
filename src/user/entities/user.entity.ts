import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
@Unique(['email']) // ইমেইল যেন unique হয়
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column() 
  password: string;

  @Column({ default: true })
  isActive: boolean = true;

  @Column({ type: 'simple-array', default: 'standard' })
  roles: Role[] = [Role.standard];
}
