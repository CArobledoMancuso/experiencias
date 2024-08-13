import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { auth0Config } from './config/auth0-config';
import { auth } from 'express-openid-connect';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS usando la variable de entorno FRONTEND_URL
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Usa el valor de FRONTEND_URL o localhost como fallback
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Auth0 con express-openid-connect
  app.use(auth(auth0Config));

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Invitación Gourmet API')
    .setDescription('Documentación de la API de Invitación Gourmet')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  const port = process.env.PORT || 3001; // Usa el puerto de la variable de entorno o 3001 como fallback
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
