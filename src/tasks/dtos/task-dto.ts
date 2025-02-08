import { TaskStatus } from '../models/task-model'
import { IsNotEmpty, IsEnum } from 'class-validator'

export class TaskRequestDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus
}

export interface TaskSearchRequestDto {
  title?: string
  status?: TaskStatus
}
