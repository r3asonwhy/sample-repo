import { Test, TestingModule } from '@nestjs/testing';
import { User, UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    expect(service.findAll()).toEqual([
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    ]);
  });

  it('should return a single user by id', () => {
    expect(service.findOne(1)).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should create a new user', () => {
    const newUser: User = { id: Math.floor(Math.random() * 1000), name: 'Alice', email: 'alice@example.com' };
    const createdUser = service.create(newUser);
    expect(createdUser).toEqual({
      id: expect.any(Number),
      name: 'Alice',
      email: 'alice@example.com',
    });
  });
});
