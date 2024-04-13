import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
  ) {}
}
