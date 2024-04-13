import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import mongoose from 'mongoose';

let container: StartedMongoDBContainer;
let db: mongoose.Connection;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const { container } = await startTestDbContainer();

        return {
          uri: container.getConnectionString(),
          authSource: 'admin',
        };
      },
    }),
  ],
})
export class TestDBModule {}

export const startTestDbContainer = async () => {
  if (!container)
    container = await new MongoDBContainer('mongo:6.0.1').withReuse().start();

  if (!db)
    db = mongoose.createConnection(container.getConnectionString(), {
      directConnection: true,
    });

  return { container, db };
};
