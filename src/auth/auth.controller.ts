import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guards';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { SignUpUserDto } from 'src/users/dto/signup-user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @Post('login')
    @UseGuards(LocalGuard)
    @ApiOperation({summary: 'Login for a user'})
    @ApiBody({type: LoginUserDto})
    @ApiResponse({status: 200, description: 'User logged in successfully'})
    login(@Req() req: Request){
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiOperation({summary: 'Register a user'})
    @ApiBody({type: SignUpUserDto})
    @ApiResponse({status: 201, description: 'User registered successfully', type: SignUpUserDto})
    register(@Body() authUser: SignUpUserDto){
        return this.userService.create(authUser);
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    @ApiOperation({summary: 'Logout for a user'})
    @ApiResponse({status: 200, description: 'User logged out successfully'})
    logout(@Req() req: Request){
        return req.logOut((err:any) => {
            if(err) throw err;
            req.user = null;
        });
    }
}
