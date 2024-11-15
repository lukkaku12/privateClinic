import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategey'; 
import { UsersService } from 'src/users/users.service';
import User from 'src/users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]), 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '60m' }, 
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService], 
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}