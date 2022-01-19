import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from "@nestjs/common";
import { TodoDto } from "../../dto/todo.dto";
import { UpdateTodoDto } from "../../dto/update-todo.dto";
import { Todo } from "../../entities/todo.entity";
import { ValidatePayloadExistsPipe } from "../../pipes/payload-exists.pipe";
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

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<Todo> {
    return await this.todosService.findOne(id);
  }

  @Post()
  async create(@Body() todoDto: TodoDto) {
    return await this.todosService.create(todoDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.todosService.remove(id);
  }

  @Put('/:id')
  @UsePipes(ValidatePayloadExistsPipe)
  async update(@Param('id') id: number, @Body() todoDto: UpdateTodoDto) {
    return await this.todosService.update(id, todoDto);
  }
}