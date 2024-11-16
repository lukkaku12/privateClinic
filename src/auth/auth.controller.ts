import { Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Log in to obtain an access token' })
  @ApiBody({
    description: 'User credentials for login',
    schema: {
      example: {
        email: 'perrito123@gmail.com',
        password: 'whicheverRight',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns an access token',
    schema: {
      example: {
        status: 200,
        message: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    return { status: HttpStatus.OK, message: response.access_token };
  }
}