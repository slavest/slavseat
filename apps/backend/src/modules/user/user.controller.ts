import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AdminGuard } from '../admin/guard/admin.guard';
import { AuthUserGuard } from '../auth/guard/auth-user.guard';
import { AddUserRequestDto } from './dto/request/addUser.dto';
import { SearchUserByNameRequestDto } from './dto/request/searchUserByName.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('유저')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '전체 유저 조회' })
  @ApiOkResponse({ type: User, isArray: true })
  getAllUser() {
    return this.userService.findAllUser();
  }

  @Get('/search/name')
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 이름 검색' })
  @ApiCreatedResponse({ type: User, isArray: true })
  searchUserByName(@Query() serachuserBynameRequestDto: SearchUserByNameRequestDto) {
    return this.userService.searchUserByName(serachuserBynameRequestDto.name);
  }

  @Post()
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '단일 유저 등록' })
  @ApiCreatedResponse({ type: User })
  addUser(@Body() addUserRequestDto: AddUserRequestDto) {
    return this.userService.saveUser(addUserRequestDto);
  }
}
