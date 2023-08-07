import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property identifier` })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `number og guests` })
  readonly pricePerNight: number;
}
