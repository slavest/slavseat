import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '@slavseat/types';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(userSummary: Model.UserSummary): Promise<User> {
    const exist = await this.userRepository.findOneBy({
      email: userSummary.email,
    });
    if (exist) {
      await this.userRepository.update(exist, userSummary);
      return this.userRepository.findOneBy({ id: exist.id });
    } else {
      return this.userRepository.save(userSummary);
    }
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
