import { Module } from '@nestjs/common';
import { MongooseModule as Mongoose } from '@nestjs/mongoose';
import { env } from '@Shared/env';

@Module({
  imports: [Mongoose.forRoot(env.MONGODB_URI, {})],
})
export class MongooseModule {}
