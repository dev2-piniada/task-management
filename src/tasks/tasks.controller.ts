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
import { Task, TaskStatus } from './models/task-model'
import {
  TaskRequestDto,
  TaskSearchRequestDto,
  UpdateTaskStatusDto,
} from './dtos/task-dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() taskSearchRequestDto: TaskSearchRequestDto): Task[] {
    if (Object.keys(taskSearchRequestDto).length) {
      return this.tasksService.getTasks(taskSearchRequestDto)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Post()
  createTask(@Body() taskRequest: TaskRequestDto): Task {
    return this.tasksService.createTask(taskRequest)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto)
  }
}
