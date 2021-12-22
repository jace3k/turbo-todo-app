import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoDto } from "src/dto/todo.dto";
import { Repository } from "typeorm";
import { Todo } from "../../entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>
  ) { }

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }

  create(todoDto: TodoDto) {
    const newTodo = new Todo();
    newTodo.title = todoDto.title;
    newTodo.description = todoDto.description;
    
    // newTodo.list = 
    

    // this.todosRepository.create({
    //   ...todoDto,
    // })
  }
}