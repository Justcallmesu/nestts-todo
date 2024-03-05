import { Module } from '@nestjs/common';
import {PublicModule} from '../public/public.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
