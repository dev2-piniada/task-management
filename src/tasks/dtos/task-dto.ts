import { TaskStatus } from '../models/task-model'
import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator'

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

export class TaskSearchRequestDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  title?: string

  @IsOptional()
  @IsString()
  status?: TaskStatus
}
