import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './task.entity'
import { TaskRequestDto } from './dtos/task-dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  gatTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post('/')
  createTask(@Body() taskDto: TaskRequestDto): Promise<Task> {
    return this.tasksService.createTask(taskDto)
  }

  @Get('/')
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks()
  }
}
