import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest id` })
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest lastname` })
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest ciudad` })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `guest pais` })
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'El formato del email no es válido' })
  @ApiProperty({ description: `guest email` })
  readonly email: string;
}
