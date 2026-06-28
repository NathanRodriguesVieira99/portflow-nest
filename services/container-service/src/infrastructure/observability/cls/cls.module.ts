import { randomUUID } from 'node:crypto';
import { Request } from 'express';
import { Module } from '@nestjs/common';

import { ClsModule as CLS } from 'nestjs-cls';

/*  
Kong envia o Header "X-Correlation-Id"
CLS salva o correlation id
Se não existir cria um novo correlation id
 */
@Module({
  imports: [
    CLS.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          const header = req.headers['x-correlation-id'];
          return typeof header === 'string' ? header : randomUUID();
        },
      },
    }),
  ],
})
export class ClsModule {}
