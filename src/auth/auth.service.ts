import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email); 
    
    
    if (!user) {
      return null;
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    
    const { password: _password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role};
    return {
      access_token: this.jwtService.sign(payload, {expiresIn: '1y'}), 
    };
  }
}