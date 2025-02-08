import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './models/task-model'
import { v4 as uuid } from 'uuid'
import {
  TaskRequestDto,
  TaskSearchRequestDto,
  UpdateTaskStatusDto,
} from './dtos/task-dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasks(taskSearchRequestDto: TaskSearchRequestDto): Task[] {
    let tasks = this.tasks
    if (taskSearchRequestDto.title) {
      tasks = tasks.filter((task) => task.title === taskSearchRequestDto.title)
    }

    if (taskSearchRequestDto.status) {
      tasks = tasks.filter(
        (task) => task.status === taskSearchRequestDto.status,
      )
    }
    return tasks
  }

  createTask(taskRequest: TaskRequestDto): Task {
    const task: Task = {
      id: uuid(),
      title: taskRequest.title,
      description: taskRequest.description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id)
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return task
  }

  deleteTaskById(id: string): void {
    this.getTaskById(id)
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }

  updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const task = this.getTaskById(id)
    task.status = updateTaskStatusDto.status
    return task
  }
}
