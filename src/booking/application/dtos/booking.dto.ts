import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { CreateDetailDto } from './detail.dtos';
// import { CreateCustomizedDto } from './customized.dtos';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property identifier` })
  readonly propertyId: string;
}
