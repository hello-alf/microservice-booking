import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { now, Document } from 'mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'bookings' })
export class BookingModelSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  propertyId: string;

  @Prop({ required: true })
  numberOfGuests: number;

  // getNumberOfGuests(): number {
  //   return this.numberOfGuests;
  // }

  // getPropertyId(): string {
  //   return this.propertyId;
  // }
}

export const BookingSchema = SchemaFactory.createForClass(BookingModelSchema);
