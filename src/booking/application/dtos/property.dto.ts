import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `identifier` })
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property address` })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property type` })
  readonly propertyType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property city` })
  readonly city: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `price` })
  readonly pricePerNight: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `property host` })
  readonly host: string;
}
