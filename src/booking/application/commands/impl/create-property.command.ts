import { CreatePropertyDto } from '../../dtos/property.dto';

export class CreatePropertyCommand {
  constructor(public readonly createPropertyRequest: CreatePropertyDto) {}
}
