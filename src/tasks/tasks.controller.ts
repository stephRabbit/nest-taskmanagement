import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from '@nestjs/common'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TasksService } from './tasks.service'
import { TaskStatus } from './tasks-status.enum'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './tasks.entity'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status)
  }
}
