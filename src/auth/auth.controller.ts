import { Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';



@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard) 
  @Post('login')
  @ApiBody({
    description: 'Data needed to login',
    schema: {
      example: {
        
          email:"perrito123@gmail.com",
           password:"whicheverRight"
       
      },
    },
  })
  async login(@Request() req) {
    console.log(req.user)
    const response = await this.authService.login(req.user);
    return {status:HttpStatus.OK, message:response.access_token};
     
  }

}