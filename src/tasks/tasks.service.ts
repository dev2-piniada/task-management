import { Injectable, NotFoundException } from '@nestjs/common'
import { TasksRepository } from './tasks.repository'
import { Task, TaskStatus } from './task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRequestDto } from './dtos/task-dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } })
    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`)
    }
    return task
  }

  async createTask(taskDto: TaskRequestDto): Promise<Task> {
    const task = this.tasksRepository.create({
      title: taskDto.title,
      description: taskDto.description,
      status: TaskStatus.OPEN,
    })
    return this.tasksRepository.save(task)
  }

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find()
  }
}
