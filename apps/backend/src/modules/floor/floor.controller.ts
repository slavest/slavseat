import { Controller } from '@nestjs/common';

import { FloorService } from './floor.service';

@Controller('floor')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}
}
