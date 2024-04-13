import { Controller } from '@nestjs/common';
import { CatFacade } from './cat.facade';

@Controller('cats')
export class CatController {
  constructor(private readonly catFacade: CatFacade) {}
}
