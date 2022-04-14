import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { LocalStrategy } from './local.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import SECRET from '../../config/secret.constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '12h' },

    })
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule { }
