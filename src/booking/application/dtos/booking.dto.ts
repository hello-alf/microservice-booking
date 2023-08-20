import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'property identifier' })
  readonly propertyId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'number of guests' })
  readonly numberOfGuests: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'checkIn of booking' })
  readonly checkInDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'checkout of booking' })
  readonly checkOutDate: Date;
}
