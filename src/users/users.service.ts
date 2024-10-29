import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(signUpUser: SignUpUserDto) {

    const user = await this.userRepository.findOneBy({username: signUpUser.username});

    if(user){
      throw new ConflictException("User already exists");
    }

    return this.userRepository.save(signUpUser);

  }

  findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({username});
  }

}
