import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
