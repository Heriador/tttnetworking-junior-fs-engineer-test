import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from './status.enum';

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

  describe('create', () => {
    it('should create a task and return it', async () => {
      const result: Task = {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        status: Status.pending,
        end_date: new Date(),
      };
      jest.spyOn(tasksService, 'create').mockImplementation(() => Promise.resolve(result));
      const task: Task = await controller.create({
        name: 'Test Task',
        description: 'Test Description',
        end_date: new Date(),
      });
      expect(task).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      const result: Task = {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        status: Status.pending,
        end_date: new Date(),
      };
      jest.spyOn(tasksService, 'findOne').mockImplementation(() => Promise.resolve(result));
      
      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a task and return it', async () => {
      const result: Task = {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        status: Status.inProgress,
        end_date: new Date(),
      };
      jest.spyOn(tasksService, 'update').mockImplementation(() => Promise.resolve(result));
      const task = await controller.update(1, {
        name: 'Test Task',
        description: 'Test Description',
        status: Status.pending,
        end_date: new Date(),
      });
      expect(task).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const result = {raw: [],affected: 1};
      jest.spyOn(tasksService, 'remove').mockImplementation(() => Promise.resolve(result));
      const removedTask = await controller.remove(1);
      expect(removedTask).toEqual(result);
    });
  });

});
