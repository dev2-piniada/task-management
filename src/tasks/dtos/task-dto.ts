import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator'
import { TaskStatus } from '../task.entity'

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
