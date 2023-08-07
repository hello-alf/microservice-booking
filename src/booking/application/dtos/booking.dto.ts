import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { CreateDetailDto } from './detail.dtos';
// import { CreateCustomizedDto } from './customized.dtos';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property identifier` })
  readonly propertyId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `number og guests` })
  readonly numberOfGuests: number;
}
