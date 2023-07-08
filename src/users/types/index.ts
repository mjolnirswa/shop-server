import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'ivan' })
  username: string;

  @ApiProperty({ example: 'test' })
  password: string;
}

export class LoginUserResponce {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'ivan',
        password: 'test',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponce {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponce {
  @ApiProperty({ example: 1 })
  password: number;

  @ApiProperty({ example: 'ivan' })
  username: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  email: string;
}

export class SignUpResponce {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ivan' })
  username: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  email: string;

  @ApiProperty({ example: 'hashedTest' })
  password: string;

  @ApiProperty({ example: '2023-07-02T07:42:52.942Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-07-02T07:42:52.942Z' })
  createdAt: string;
}
