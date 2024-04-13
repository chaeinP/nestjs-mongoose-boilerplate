import { Injectable } from '@nestjs/common';
import { CatRepository } from './cat.repository';

@Injectable()
export class CatService {
  constructor(private readonly catRepository: CatRepository) {}
}
