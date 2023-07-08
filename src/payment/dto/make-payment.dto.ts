import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MakePaymentDto {
  @ApiProperty({ example: 100 })
  @IsString()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ example: 'заказ №1' })
  @IsString()
  @IsNotEmpty()
  readonly description?: string;
}
