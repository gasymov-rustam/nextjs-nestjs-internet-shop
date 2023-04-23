import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaymentDto {
  @ApiProperty({ example: '100', description: 'amount' })
  @IsNotEmpty()
  readonly amount: number;
}
