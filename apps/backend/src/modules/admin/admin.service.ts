import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(private readonly configService: ConfigService) {}

  isAdmin(email: string) {
    return this.configService.get<string[] | undefined>('ADMINS')?.includes(email) ?? false;
  }
}
