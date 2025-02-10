import { Task } from './task.entity'
import { Repository } from 'typeorm'
import { TaskSearchRequestDto } from './dtos/task-dto'

export class TasksRepository extends Repository<Task> {
  async getTasksWithFilters(filter: TaskSearchRequestDto): Promise<Task[]> {
    {
      const query = this.createQueryBuilder('task')
      if (filter.title) {
        query.andWhere('task.title LIKE :title', { title: `%${filter.title}%` })
      }
      if (filter.status) {
        query.andWhere('task.status = :status', { status: filter.status })
      }
      return await query.getMany()
    }
  }
}
