import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });

  const app = await NestFactory.create(AppModule);

  // add origin later
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.error('tk VALIDATION FAILED:', JSON.stringify(errors, null, 2));
        return errors;
      },
    }),
  );

  //firebase ;

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
