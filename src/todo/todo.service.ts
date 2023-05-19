import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  todoArray: Todo[];

  addTodo(subtitle: string) {
    console.log(`=>>>===>${subtitle}`);
    const todo = new Todo();
    todo.id = '1';
    todo.subtitle = subtitle;

    this.todoArray.push(todo);
  }

  getTodos() {
    return this.todoArray;
  }
}
