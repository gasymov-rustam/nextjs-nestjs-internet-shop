import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'John', description: 'User name' })
  username: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: '1',
        username: 'John',
        password: '12345',
      },
    },
    description: 'User data',
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'login successful', description: 'Message' })
  message: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  message: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ivan' })
  username: string;

  @ApiProperty({
    example: '$2b$10$90H0Hn.6Nx0SbrHQCX2xeeYjq.02nS5VpkIIwFAtDtCHEqHK',
  })
  password: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  email: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  createdAt: string;
}
