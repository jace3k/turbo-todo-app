import { IsNumber, IsOptional, IsString, Length } from "class-validator";
import { TodoDtoInterface } from '@turbo-todo-app/shared';

export class TodoDto implements TodoDtoInterface {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @Length(0, 8096)
  @IsOptional()
  description: string;

  @IsNumber()
  list: number
}