import { Injectable, NotFoundException } from '@nestjs/common'
import { TasksRepository } from './tasks.repository'
import { Task, TaskStatus } from './task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRequestDto, TaskSearchRequestDto } from './dtos/task-dto'
import { Repository } from 'typeorm'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
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
    return await this.tasksRepository.save(task)
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find()
  }

  async deleteTaskById(id: string): Promise<void> {
    const task = await this.tasksRepository.delete({ id })
    console.log(task)
    if (task.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`)
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    return await this.tasksRepository.save(task)
  }

  async getTasksWithFilters(filter: TaskSearchRequestDto): Promise<Task[]> {
    const query = this.tasksRepository.createQueryBuilder('task')
    if (filter.title) {
      query.andWhere('task.title LIKE :title', { title: `%${filter.title}%` })
    }
    if (filter.status) {
      query.andWhere('task.status = :status', { status: filter.status })
    }
    return await query.getMany()
  }
}
