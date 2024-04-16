import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AdminGuard } from '../auth/guard/admin.guard';
import { AuthUserGuard } from '../auth/guard/auth-user.guard';
import { SearchUserByNameRequestDto } from './dto/request/searchUserByName';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('유저')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/search/name')
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 이름 검색' })
  @ApiCreatedResponse({ type: User, isArray: true })
  searchUserByName(
    @Query() serachuserBynameRequestDto: SearchUserByNameRequestDto,
  ) {
    return this.userService.searchUserByName(
      serachuserBynameRequestDto.name,
    );
  }
}
