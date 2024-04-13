import { Module } from '@nestjs/common';
import { CatDomainModule } from '@src/domain/cat/cat.domain.module';
import { CatController } from './cat.controller';
import { CatFacade } from './cat.facade';

@Module({
  imports: [CatDomainModule],
  providers: [CatFacade],
  controllers: [CatController],
})
export class CatModule {}
