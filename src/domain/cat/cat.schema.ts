import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Cat {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  createdAt: Date;

  updatedAt: Date;
}

export const catSchema = SchemaFactory.createForClass(Cat);

catSchema.index({ startDate: 1 });

export type CatDocument = Cat & Document;
