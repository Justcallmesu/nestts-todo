import { Module } from '@nestjs/common';
import {PublicModule} from '../public/public.module'

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PublicModule,ConfigModule.forRoot({envFilePath:'.env'})],
})
export class AppModule {}
