import { Injectable, Req, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersSerive: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(authUser: LoginUserDto){

        const findUser: User = await this.usersSerive.findOne(authUser.username);
        if(!findUser) return null;
        if(authUser.password === findUser.password){
            const { password, ...result } = findUser;
            return result;
        }
    }

    async login(user: any){
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
