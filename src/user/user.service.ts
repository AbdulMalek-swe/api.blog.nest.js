import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  create(createUserDto: UserDto): Promise<User> {
    const user = new User(); 
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password; 
    return this.usersRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
