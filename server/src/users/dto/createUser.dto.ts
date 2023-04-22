import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'john@.com.us', description: 'User email' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
