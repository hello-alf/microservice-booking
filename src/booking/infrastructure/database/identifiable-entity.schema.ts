import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export abstract class IdentifiableEntitySchema extends Document {
  @Prop()
  readonly _id: ObjectId;
}
