import { Module } from '@nestjs/common';
import { CatRepository } from './cat.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, catSchema } from './cat.schema';
import { CatService } from './cat.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: catSchema }])],
  providers: [CatRepository, CatService],
  exports: [CatService],
})
export class CatDomainModule {}
