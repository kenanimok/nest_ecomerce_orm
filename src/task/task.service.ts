import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchTasksDto } from './dto/search-tasks.dto';

export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getListTask(searchTasksDto: SearchTasksDto): Promise<Task[]> {
    try {
      const { search } = searchTasksDto;
      const query = this.taskRepository.createQueryBuilder('task');
      if (search) {
        query.andWhere(
          '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
          { search: `%${search}%` },
        );
      }

      const tasks = await query.getMany();
      return tasks;
    } catch (err) {
      throw new NotFoundException({
        message: ['Task not found.'],
      });
    }
  }

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
