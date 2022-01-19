import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsNotEmptyObject } from "class-validator";
import { TodoDto } from "./todo.dto";

export class UpdateTodoDto extends PartialType(TodoDto) {};
