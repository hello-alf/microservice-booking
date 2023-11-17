import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ collection: 'properties' })
export class PropertyModelSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  id: number;

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
}

export const PropertySchema = SchemaFactory.createForClass(PropertyModelSchema);
