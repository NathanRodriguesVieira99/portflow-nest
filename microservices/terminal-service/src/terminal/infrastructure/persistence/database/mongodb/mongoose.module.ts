import { Module } from '@nestjs/common';
import { MongooseModule as Mongoose } from '@nestjs/mongoose';
import {
  TerminalSchema,
  TerminalSchemaDefinition,
} from './schemas/terminal.schema';
import { env } from '@Shared/env';

@Module({
  imports: [
    Mongoose.forRoot(env.MONGODB_URI, {}),
    Mongoose.forFeature([
      {
        name: TerminalSchema.name,
        schema: TerminalSchemaDefinition,
      },
    ]),
  ],
})
export class MongooseModule {}
