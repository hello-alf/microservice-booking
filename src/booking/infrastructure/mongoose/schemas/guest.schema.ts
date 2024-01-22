import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema({ collection: 'guest' })
export class GuestModelSchema extends Document {
  @Prop()
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  email: string;
}

export const GuestSchema = SchemaFactory.createForClass(GuestModelSchema);
