import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { AuthValidateResponse } from './dto/Auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  validateUser = async (username: string, password: string) => {
    const user = await this.userService.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    if (user && isValidPassword)
      return new AuthValidateResponse({
        userId: user.id,
        username: user.username,
        email: user.email,
      });

    return null;
  };
}
