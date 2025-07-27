import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private userservice: UserService,
  ) {}
  async register(body: any): Promise<Record<string, any>> {
    let isOk = false;
    // console.log(body);
    const userDTO = new UserDto();
    userDTO.email = body.email;
    userDTO.name = body.name;
    userDTO.password = body.password;
     
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        console.log(errors);
        // this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.userservice.create(userDTO).catch((error) => {
        // this.logger.debug(error.message);
        console.log(error?.message);
        isOk = false;
      });
      if (isOk) {
        return { status: 201, content: { msg: 'User created with success' } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
  async findAllUser(): Promise<Record<string, any>> {
    return {
      status: 400,
      content: {
        msg: 'Invalid content',
        data: await this.userservice.findAll(),
      },
    };  
  }
}
