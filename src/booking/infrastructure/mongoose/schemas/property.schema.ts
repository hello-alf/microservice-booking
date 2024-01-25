import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema({ collection: 'properties' })
export class PropertyModelSchema extends Document {
  @Prop()
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ required: true })
  host: string;
}

export const PropertySchema = SchemaFactory.createForClass(PropertyModelSchema);
