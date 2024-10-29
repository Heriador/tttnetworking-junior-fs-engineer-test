import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './status.enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){}

  async create(user:any ,createTaskDto: CreateTaskDto) {

    const task: Task = await this.taskRepository.findOneBy({name: createTaskDto.name});

    if(task){
      throw new ConflictException("Task already exists");
    }
    console.log(user);

    createTaskDto.userId = user.sub;

    return this.taskRepository.save(createTaskDto);
  }

  findAll(user: any,status?: Status) {
    console.log(user);
    if(!status){
      return this.taskRepository.findBy({userId: user.sub});
    }
    return this.taskRepository.findBy({userId: user.sub,status});
  }

  findOne(user: any,id: number) {
    return this.taskRepository.findOneBy({userId: user.sub,id});
  }

  async update(user: any,id: number, updateTaskDto: UpdateTaskDto) {
    const task: Task = await this.taskRepository.findOneBy({userId: user.sub,id});
    if(!task){
      throw new NotFoundException("Task not found");
    }

    task.name = updateTaskDto.name;
    task.description = updateTaskDto.description;
    task.status = updateTaskDto.status;
    task.end_date = updateTaskDto.end_date;

    return this.taskRepository.save(task);
  }

  async remove(user:any, id: number) {
    const task: Task = await this.taskRepository.findOneBy({userId: user.sub,id});
    if(!task){
      throw new NotFoundException("Task not found");
    }

    return this.taskRepository.delete(id);
  }
}
