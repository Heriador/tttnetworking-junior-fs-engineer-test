import { Controller, Get, Post, Body, Param, Delete, Query, Put, ParseIntPipe, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Status } from './status.enum';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({summary: 'Create a task'})
  @ApiBody({type: CreateTaskDto})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Task created successfully', type: CreateTaskDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Task already exists'})
  create(@Req() req: Request,@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user,createTaskDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all tasks'})
  @ApiResponse({status: 200, description: 'Tasks retrieved successfully', type: [Task]})
  findAll(@Req() req: Request,@Query('status') status?: Status) {
    return this.tasksService.findAll(req.user,status);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a task by id'})
  @ApiResponse({status: 200, description: 'Task retrieved successfully', type: Task})
  findOne(@Req() req: Request,@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(req.user,+id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update a task by id'})
  @ApiResponse({status: 200, description: 'Task updated successfully', type: UpdateTaskDto})
  update(@Req() req: Request,@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(req.user,+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a task by id'})
  @ApiResponse({status: 200, description: 'Task deleted successfully'})
  remove(@Req() req: Request,@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(req.user,+id);
  }
}
