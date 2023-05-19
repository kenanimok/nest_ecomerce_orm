import { Controller, Post, Body, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  //   postTodo(@Body('title') title: string, @Body('subtitle') subtitle: string) {
  //     console.log(`title:==>${title},subtitle=>${subtitle}`);
  //   }

  @Post()
  postTodo(@Body('subtitle') subtitle: string) {
    this.todoService.addTodo(subtitle);
  }
  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }
}
