import { Injectable } from '@nestjs/common';
import { TodoElement } from 'types'

@Injectable()
export class AppService {
  getHello(): string {
    const todo: TodoElement = {
      id: 1,
      title: 'AAAAA',
      content: 'content of the todo elementa'
    }
    return `todo: ${todo.title}:ddd ${todo.content}`;
  }
}
