import { Module } from '@nestjs/common';

// Config & Project Module
import {PublicModule} from '../public/public.module'
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [PublicModule,
    ConfigModule.forRoot({envFilePath:'.env'}),
    MongooseModule.forRoot("mongodb://localhost:27017/nest-todo")],
})
export class AppModule {}
