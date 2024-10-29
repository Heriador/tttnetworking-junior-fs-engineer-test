import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Status } from "src/tasks/status.enum";

export class CreateTaskDto {

    @IsString()
    @MinLength(3)
    @MaxLength(60)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(120)
    description: string;

    status?: Status;

    @IsDateString()
    @IsNotEmpty()
    end_date: Date;
}
