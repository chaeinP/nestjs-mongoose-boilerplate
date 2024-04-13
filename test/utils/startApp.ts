import mongoose from 'mongoose';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { StartedMongoDBContainer } from '@testcontainers/mongodb';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filter/http-exception-filter';

import { TestDBModule, startTestDbContainer } from './test-db.module';

const getTestApp = () => {
  let app: INestApplication | undefined;
  let db: mongoose.Connection;
  let container: StartedMongoDBContainer;

  const startApp = async () => {
    if (app) return { app, db };

    const { container: mongoContainer, db: mongoDb } =
      await startTestDbContainer();

    container = mongoContainer;
    db = mongoDb;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestDBModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors();

    await app.init();

    return {
      app,
      db,
    };
  };

  const closeApp = async () => {
    if (app) {
      await mongoose
        .disconnect()
        .then(async () => await container.stop())
        .then(async () => await app!.close());
    }
    app = undefined;
  };

  return {
    startApp,
    closeApp,
  };
};

export const { startApp, closeApp } = getTestApp();
