import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nRequestScopeService } from "nestjs-i18n";
import { DeleteResult, Repository } from "typeorm";
import { TodoDto } from "../../dto/todo.dto";
import { UpdateTodoDto } from "../../dto/update-todo.dto";
import { List } from "../../entities/list.entity";
import { Todo } from "../../entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
    private readonly i18n: I18nRequestScopeService,
  ) { }

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todosRepository.findOne({
      where: { id },
      relations: ['list']
    });

    if (!todo) {
      const errorMessage = await this.i18n.translate('todo.NOT_FOUND');
      throw new NotFoundException([errorMessage]);
    }

    return todo;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.todosRepository.delete(id);
  }

  async create(todoDto: TodoDto) {
    const list = await this.listRepository.findOne(todoDto.list)
    if (!list) {
      const errorMessage = await this.i18n.translate('list.NOT_FOUND');
      throw new NotFoundException([errorMessage]);
    }

    return this.todosRepository.save(todoDto);
  }

  async update(id: number, todoDto: UpdateTodoDto) {
    const existingTodo = await this.todosRepository.findOne(id);
    if (!existingTodo) {
      const errorMessage = await this.i18n.translate('todo.NOT_FOUND');
      throw new NotFoundException([errorMessage]);
    }

    if (todoDto.list) {
      const existingList = await this.listRepository.findOne(todoDto.list)
      if (!existingList) {
        const errorMessage = await this.i18n.translate('list.NOT_FOUND');
        throw new NotFoundException([errorMessage]);
      }
    }

    return this.todosRepository.update(id, todoDto);
  }
}