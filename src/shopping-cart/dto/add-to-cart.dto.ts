import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: 'Ivan' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  readonly partId: number;
}
