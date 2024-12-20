import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    // Mock UserService
    const mockUserService = {
      findAll: jest.fn(() => [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
      ]),
      findOne: jest.fn((id: number) => ({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      })),
      create: jest.fn((user) => ({ id: 3, ...user })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, // Use the mocked service
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        id: expect.any(Number),
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        id: expect.any(Number),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
    ]);
  });

  it('should return a single user by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: expect.any(Number),
      name: 'User 1',
      email: 'user1@example.com',
    });
  });

  it('should create a new user', async () => {
    const newUser = { name: 'Alice', email: 'alice@example.com' };
    const result = await controller.create(newUser);
    expect(result).toEqual({
      id: expect.any(Number),
      name: 'Alice',
      email: 'alice@example.com',
    });
  });
});
