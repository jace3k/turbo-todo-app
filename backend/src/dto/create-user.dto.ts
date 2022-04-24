import { IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @Length(3, 100)
  password: string;
}