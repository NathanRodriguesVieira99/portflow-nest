import { Global, Module } from '@nestjs/common';
import { HttpClient } from './clients/http-client';

@Global()
@Module({
  providers: [HttpClient],
  exports: [HttpClient],
})
export class HttpModule {}
