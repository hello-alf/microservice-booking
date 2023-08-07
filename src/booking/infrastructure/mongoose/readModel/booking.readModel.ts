import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { now, Document } from 'mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'bookings' })
export class BookingReadModel extends IdentifiableEntitySchema {
  @Prop()
  readonly propertyId: string;

  @Prop()
  readonly numberOfGuests: number;
}
