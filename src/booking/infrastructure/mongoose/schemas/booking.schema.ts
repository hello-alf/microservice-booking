import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ collection: 'bookings' })
export class BookingModelSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  propertyId: string;

  @Prop({ required: true })
  numberOfGuests: number;

  @Prop({ required: true })
  numberOfDays: number;

  @Prop({ required: true })
  costByNight: number;

  @Prop({ required: true })
  totalCost: number;

  @Prop({ required: true })
  bookingState: string;

  @Prop({ required: true })
  paymentState: string;

  @Prop({ type: Date, required: true })
  checkInDate: Date;

  @Prop({ type: Date, required: true })
  checkOutDate: Date;

  @Prop({ type: Date, required: true })
  registerDate: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(BookingModelSchema);
