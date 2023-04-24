import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'John', description: 'User name' })
  @IsNotEmpty({ message: 'User name should not be empty' })
  readonly username: string;

  @ApiProperty({ example: '1', description: 'User Id' })
  @IsOptional()
  readonly userId: string;

  @ApiProperty({ example: '1', description: 'Part Id' })
  @IsNotEmpty({ message: 'Part Id should not be empty' })
  readonly partId: string | number;

  constructor(username: string, partId: string | number) {
    this.username = username;
    this.partId = partId;
  }
}
