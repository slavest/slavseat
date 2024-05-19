import { PickType } from '@nestjs/swagger';

import { User } from '../../entity/user.entity';

export class SearchUserByNameRequestDto extends PickType(User, [
  'name',
]) {}
