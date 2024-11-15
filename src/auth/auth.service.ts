import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly playerService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const player = await this.playerService.findByEmail(email); 
    
    
    if (!player) {
      return null;
    }

   
    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      return null;
    }

    
    const { password: _password, ...result } = player;
    return result;
  }

  async login(player: any) {
    const payload = { username: player.email, sub: player.id };
    return {
      access_token: this.jwtService.sign(payload, {expiresIn: '1y'}), 
    };
  }
}