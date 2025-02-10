import { Task } from './task.entity'
import { Repository } from 'typeorm'

export class TasksRepository extends Repository<Task> {}
