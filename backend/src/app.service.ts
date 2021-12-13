import { Injectable } from '@nestjs/common';
import { TodoElement } from '@shared/types'

@Injectable()
export class AppService {
  getHello() {
    const todo: TodoElement = {
      id: 1,
      title: 'Do something',
      content: 'content of the todo element'
    }
    return { message: `TITLE: ${todo.title} CONTENT: ${todo.content}` }
  }
}
