import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  LoginCheckResponce,
  LoginUserRequest,
  LoginUserResponce,
  LogoutUserResponce,
  SignUpResponce,
} from './types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: SignUpResponce })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponce })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return { user: req.user, msg: 'Logged in' };
  }

  @ApiOkResponse({ type: LoginCheckResponce })
  @Get('/login-check')
  @UseGuards(AuthGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LogoutUserResponce })
  @Get('/logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'Session has ended' };
  }
}
