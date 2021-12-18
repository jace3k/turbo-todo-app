import { Controller, Get, Post } from "@nestjs/common";
import { Todo } from "src/models/todo.entity";
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
  async create() {
    
  }

}