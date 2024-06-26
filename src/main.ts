import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }));
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Products example')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
