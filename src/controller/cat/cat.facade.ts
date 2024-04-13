import { Injectable } from '@nestjs/common';
import { CatService } from '@src/domain/cat/cat.service';

@Injectable()
export class CatFacade {
  constructor(private readonly catService: CatService) {}
}
