import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { SearchTasksDto } from './dto/search-tasks.dto';

@ApiTags('Task') // Add this tag to group the endpoints in Swagger under 'Task'
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Get()
  // getAllTasks() {
  //   return this.taskService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    description: 'search',
    required: false,
  })
  @Get()
  getTasks(@Query() searchTasksDto: SearchTasksDto) {
    return this.taskService.getListTask(searchTasksDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
