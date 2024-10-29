import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from 'src/tasks/status.enum';

describe('TasksController', () => {
  let controller: TasksController;
  let mockTask: Task = new Task();
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, {
        provide: getRepositoryToken(Task),
        useValue: {
          save: jest.fn().mockResolvedValue(mockTask),
          find: jest.fn().mockResolvedValue([mockTask]),
        }
      }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: 1,
          name: 'Test Task',
          description: 'Test Description',
          status: Status.pending,
          end_date: new Date(),
        }
      ];
      jest.spyOn(tasksService, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    });
  });

});
