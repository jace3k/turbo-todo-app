import { IsString, Length } from "class-validator";
import { ListDtoInterface } from '@turbo-todo-app/shared';

export class ListDto implements ListDtoInterface {
  @IsString()
  @Length(3, 100)
  name: string;
} 