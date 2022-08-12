import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfirmAccount, ConfirmAccountSchema } from 'src/schemas/confirmaccount.schema';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: ConfirmAccount.name, schema: ConfirmAccountSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [ConfigService,UsersService,MailService],
  exports:[UsersService]
})
export class UsersModule {}
