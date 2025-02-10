import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './task.entity'
import { TaskRequestDto, TaskSearchRequestDto } from './dtos/task-dto'

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

  @Get()
  getAllTasks(@Query() filterDto: TaskSearchRequestDto): Promise<Task[]> {
    return this.tasksService.getTasksWithFilters(filterDto)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
