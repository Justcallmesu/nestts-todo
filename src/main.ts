import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// Config
import *  as dotenv from "dotenv";

// Middleware
import * as cookieParser from "cookie-parser";

dotenv.config({path:"../.env"})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser())
  app.enableCors({origin:"http://localhost:5173",credentials:true})
  await app.listen(3000);
}
bootstrap();
