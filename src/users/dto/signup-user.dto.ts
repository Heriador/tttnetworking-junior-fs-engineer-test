import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpUserDto {

    @IsEmail()
    username: string;

    @IsString()
    @MinLength(8)
    password: string;

}
