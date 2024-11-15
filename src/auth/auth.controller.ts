import { Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard) 
  @Post('login')
  async login(@Request() req) {
    console.log(req.user)
    const response = await this.authService.login(req.user);
    return {status:HttpStatus.OK, message:response.access_token};
     
  }

}