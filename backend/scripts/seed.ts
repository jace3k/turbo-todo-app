import { List } from "../src/entities/list.entity";
import { Connection, getConnection, Repository } from "typeorm";
import { Todo } from "../src/entities/todo.entity";

export class Seed {
  private connection: Connection;
  private listRepository: Repository<List>;
  private todoRepository: Repository<Todo>;

  LISTS_AMOUNT = 4;
  TODOS_AMOUNT = 6;

  constructor() {
    this.connection = getConnection();
    this.listRepository = this.connection.getRepository(List);
    this.todoRepository = this.connection.getRepository(Todo);
  }

  async clear() {
    await this.listRepository.clear();
    await this.todoRepository.clear();
  }

  async clearAndSeed() {
    await this.clear();
    await this.seed();
  }

  async seed() {
    await this.seedLists();
    await this.seedTodos();
  }

  async seedLists() {
    await this.listRepository.save([
      { id: 1, name: "TestList1" },
      { id: 2, name: "TestList2" },
      { id: 3, name: "TestList3" },
      { id: 4, name: "TestList4" },
    ]);
  }

  async seedTodos() {
    await this.todoRepository.save([
      { id: 1, title: 'Do something 1', description: 'Description to do something 1', list: 1 },
      { id: 2, title: 'Do something 2', description: 'Description to do something 2', list: 1 },
      { id: 3, title: 'Do something 3', description: 'Description to do something 3', list: 1 },
      { id: 4, title: 'Do something 4', description: 'Description to do something 4', list: 2 },
      { id: 5, title: 'Do something 5', description: 'Description to do something 5', list: 2 },
      { id: 6, title: 'Do something 6', description: 'Description to do something 6', list: 3 },
    ]);
  }
}
