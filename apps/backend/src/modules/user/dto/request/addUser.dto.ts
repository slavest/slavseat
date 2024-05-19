import { PickType } from '@nestjs/swagger';

import { User } from '../../entity/user.entity';

export class AddUserDto extends PickType(User, ['name', 'email']) {}
