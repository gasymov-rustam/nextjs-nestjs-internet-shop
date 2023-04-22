import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  LoginCheckResponse,
  LoginUserRequest,
  LoginUserResponse,
  LogoutUserResponse,
  SignupResponse,
} from './types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponse })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  login(@Request() req) {
    return { user: req.user, message: 'Login successful' };
  }

  @ApiOkResponse({ type: LoginCheckResponse })
  @Get('/login-check')
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LogoutUserResponse })
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  logOut(@Request() req) {
    req.session.destroy();
    return { message: 'Logout successful' };
  }
}
