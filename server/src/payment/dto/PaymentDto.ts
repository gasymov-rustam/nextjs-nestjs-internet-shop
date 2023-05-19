import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaymentDto {
  @ApiProperty({ example: '100', description: 'amount' })
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ example: 'Order #1' })
  @IsOptional()
  readonly description?: string;
}
