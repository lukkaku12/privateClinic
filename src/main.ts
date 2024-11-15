import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.enableCors({
    origin: ['*'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true,
  });
  const doc = new DocumentBuilder()
    .setTitle('Private Clinic API')
    .setDescription('Employment Assesment!')
    .setVersion('1.0')
    .addTag('striving but aint failing')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('docs', app, document);
  console.log('Application is running on: http://localhost:3000/api/v1');

  await app.listen(3000);
}
bootstrap();
