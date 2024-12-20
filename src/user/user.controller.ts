import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: { name: string; email: string }) {
    const newUser = {
      id: Math.floor(Math.random() * 1000), // Dummy ID generation
      ...user,
    };
    return this.userService.create(newUser);
  }
}
