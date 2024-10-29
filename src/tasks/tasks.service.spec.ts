import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let mockTask: Task = new Task();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, {
        provide: getRepositoryToken(Task),
        useValue: {
          save: jest.fn().mockResolvedValue(mockTask),
          find: jest.fn().mockResolvedValue([mockTask]),
          findBy: jest.fn().mockResolvedValue([mockTask]),
        }
      }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = await service.findAll();
      expect(tasks).toStrictEqual([mockTask]);
    });
  });
});
