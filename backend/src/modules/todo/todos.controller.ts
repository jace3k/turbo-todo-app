import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { TodoDto } from "src/dto/todo.dto";
import { Todo } from "src/entities/todo.entity";
import { TodosService } from "./todos.service";

@Controller('todos')
export class TodosController {
  constructor(
    private todosService: TodosService
  ) { }
  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) todoDto: TodoDto) {
  // TODO
    return 'ok'
  }

}