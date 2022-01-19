import { Injectable } from '@nestjs/common';
import { TodoDtoInterface } from '@turbo-todo-app/shared';

@Injectable()
export class AppService {
  getHello() {
    const todo: TodoDtoInterface = {
      title: 'Do something',
      description: 'content of the todo element',
      list: 1,
    }
    return { message: `TITLE: ${todo.title} CONTENT: ${todo.description}` }
  }
}
