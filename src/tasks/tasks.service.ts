import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/tasks/status.enum';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){}

  async create(createTaskDto: CreateTaskDto) {

    const task: Task = await this.taskRepository.findOneBy({name: createTaskDto.name});

    if(task){
      throw new ConflictException("Task already exists");
    }

    return this.taskRepository.save(createTaskDto);
  }

  findAll(status?: Status) {
    if(!status){
      return this.taskRepository.find();
    }
    return this.taskRepository.findBy({status});
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({id});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task: Task = await this.taskRepository.findOneBy({id});
    if(!task){
      return "Task not found";
    }

    task.name = updateTaskDto.name;
    task.description = updateTaskDto.description;
    task.status = updateTaskDto.status;
    task.end_date = updateTaskDto.end_date;

    return this.taskRepository.save(task);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
