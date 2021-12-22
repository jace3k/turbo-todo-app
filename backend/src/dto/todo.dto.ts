import { IsNumber, IsString } from "class-validator";

export class TodoDto {
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  listId: number
}