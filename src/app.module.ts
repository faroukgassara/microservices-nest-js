import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './all-exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb://localhost/micro')],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule {}
