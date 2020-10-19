import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from './../user.entity';

describe('UserService', () => {
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create un Usuario', () => {
    it('should be defined', async () => {
      const user = new User;
      user.username = null;
      user.email = 'noelia@gmail.com';
      user.password = 'prueba';
      user.status = 'ACTIVE';
      await expect(service.create(user)).rejects.toThrow(new BadRequestException());
    });
    
  })
});
